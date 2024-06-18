import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TrainerCard from '../components/Trainer/TrainerCard';
import axiosInstance from '../axiosInstance/axiosInstance';

const FindATrainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [visibleTrainers, setVisibleTrainers] = useState(8);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  // Fetch trainers when the component mounts
  useEffect(() => {
    getTrainers();
  }, []);

  // Function to fetch trainers
  const getTrainers = () => {
    axiosInstance.get('/api/users/get-trainers')
      .then((response) => {
        setTrainers(response.data.data);
        setVisibleTrainers(Math.min(8, response.data.data.length));
        setMoreAvailable(response.data.data.length > 8);
      })
      .catch((error) => {
        console.error('Error fetching trainers:', error);
        toast.error('Failed to fetch trainers');
      });
  };

  // Function to get unique departments from trainers list
  const getDepartments = () => {
    const departments = trainers.map(trainer => trainer.department);
    return [...new Set(departments)];
  };

  const availableDepartments = getDepartments();

  // Function to handle search button click
  const handleSearch = () => {
    filterTrainers(searchTerm, filterDepartment, sortOption);
  };

  // Function to handle clear search button click
  const handleClearSearch = () => {
    setSearchTerm('');
    setFilterDepartment('');
    setSortOption('');
    getTrainers(); // Reset trainers to original list
  };

  // Function to filter and sort trainers based on criteria
  const filterTrainers = (term, department, sort) => {
    let filteredTrainers = trainers.filter(trainer =>
      (trainer.username.toLowerCase().includes(term.toLowerCase()) ||
      trainer.department.toLowerCase().includes(term.toLowerCase())) &&
      (!department || trainer.department === department)
    );

    if (sort === 'nameAsc') {
      filteredTrainers.sort((a, b) => a.username.localeCompare(b.username));
    } else if (sort === 'nameDesc') {
      filteredTrainers.sort((a, b) => b.username.localeCompare(a.username));
    }

    setMoreAvailable(filteredTrainers.length > 8);
    setTrainers(filteredTrainers);
    setVisibleTrainers(Math.min(8, filteredTrainers.length));
  };

  // Function to load more trainers
  const loadMore = () => {
    setVisibleTrainers(prevVisible => prevVisible + 8);
  };

  const verifiedTrainers = trainers.filter(trainer => trainer.isVerified);

  return (
    <>
      <section className='bg-buttonBgColor'>
        <div className='container text-center'>
          <h2 className='heading'>Find a Trainer</h2>
          <div className='max-w-[600px] mx-auto rounded-md flex items-center justify-between pt-10'>
            <div className='w-full bg-black rounded-md flex items-center justify-between'>
              <input
                type='search'
                className='text-textColor py-4 pl-4 pr-2 border border-black bg-transparent w-full focus:outline-none focus:border-redBorder cursor-pointer placeholder:text-textColor'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search by name or department...'
              />
              <div>
                <button
                  className='btn mt-0 rounded-[0px] rounded-r-md border border-redBorder bg-transparent'
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
            <button
              className='text-white hover:text-redBorder m-2'
              onClick={handleClearSearch}
            >
              Clear
            </button>
          </div>

          <div className='max-w-[600px] mx-auto flex items-center '>
  <select
    className='text-textColor py-2 px-4 border border-black bg-black focus:outline-none focus:border-redBorder cursor-pointer hover:border-redBorder'
    value={filterDepartment ? filterDepartment : 'Filter By'}
    onChange={(e) => setFilterDepartment(e.target.value)}
  >
    <option value=''>Filter By</option>
    
    {availableDepartments.map((department, index) => (
      <option key={index} value={department}>{department}</option>
    ))}
  </select>

  <select
    className='text-textColor py-2 px-4 my-2 mx-8 border border-black bg-black focus:outline-none focus:border-redBorder cursor-pointer hover:border-redBorder'
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
  >
    <option value=''>Sort by</option>
    <option value='nameAsc'>Name (A-Z)</option>
    <option value='nameDesc'>Name (Z-A)</option>
  </select>
</div>


        </div>
      </section>

      <section>
        <div className='container'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 mx-10'>
            {verifiedTrainers.slice(0, visibleTrainers).length > 0 ? (
              verifiedTrainers.slice(0, visibleTrainers).map(trainer => (
                <TrainerCard key={trainer._id} trainer={trainer} />
              ))
            ) : (
              <div className="col-span-full text-center">
                <h1 className="text-red-500 text-xl">No trainers found</h1>
              </div>
            )}
          </div>

          {verifiedTrainers.length > 8 && moreAvailable && (
  <div className='text-right mt-4'>
    <button
      className='btn rounded-md border border-redBorder bg-transparent hover:text-redBorder mr-10'
      onClick={loadMore}
    >
      See More
    </button>
  </div>
)}

        </div>
      </section>
    </>
  );
};

export default FindATrainer;
