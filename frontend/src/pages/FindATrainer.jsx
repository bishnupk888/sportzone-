import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import TrainerCard from '../components/trainer/TrainerCard';
import apiServices from '../apiServices/apiServices'

const FindATrainer = () => {
  
  const [verifiedTrainers, setVerifiedTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [visibleTrainers, setVisibleTrainers] = useState(8);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0);
    const getTrainers = async () => {
      try {
        const response = await apiServices.fetchAllTrainers()
        const allTrainers = response.data.data;
        const verified = (Array.isArray(allTrainers) ? allTrainers : [])
        .filter(trainer => trainer && trainer.isVerified);
        setVerifiedTrainers(verified);
        setFilteredTrainers(verified);
        setMoreAvailable(verified.length > 8);
      } catch (error) {
        console.error('Error fetching trainers:', error);
        toast.error('Failed to fetch trainers');
      }
    };
    getTrainers();

  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const department = queryParams.get('department');
    if (department) {
      setFilterDepartment(department);
      const filteredByDep = verifiedTrainers.filter(trainer => trainer.department.toLowerCase().includes(department));
      setFilteredTrainers(filteredByDep)
    } else {
      setFilteredTrainers(verifiedTrainers);
    }
  }, [location.search, verifiedTrainers]);

  

  const getDepartments = () => {
    const departments = verifiedTrainers.map(trainer => trainer.department);
    return [...new Set(departments)];
  };

  const availableDepartments = getDepartments();

  const handleSearch = () => {
    filterTrainers(searchTerm, filterDepartment, sortOption);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilterDepartment('');
    setSortOption('');
    navigate(`/user/findtrainers`)
    
    filterTrainers('', '', '');
  };


  const filterTrainers = (term, department, sort) => {
    let filteredTrainers = verifiedTrainers.filter(trainer =>
      (trainer.username?.toLowerCase().includes(term.toLowerCase()) ||
        trainer.department?.toLowerCase().includes(term.toLowerCase())) &&
      (!department || trainer.department.toLowerCase() === department.toLowerCase())
    );

    switch (sort) {
      case 'nameAsc':
        filteredTrainers.sort((a, b) => a.username.localeCompare(b.username));
        break;
      case 'nameDesc':
        filteredTrainers.sort((a, b) => b.username.localeCompare(a.username));
        break;
      case 'departmentAsc':
        filteredTrainers.sort((a, b) => (a.department || '').localeCompare(b.department || ''));
        break;
      case 'departmentDesc':
        filteredTrainers.sort((a, b) => (b.department || '').localeCompare(a.department || ''));
        break;
      case 'genderAsc':
        filteredTrainers.sort((a, b) => (a.gender || '').localeCompare(b.gender || ''));
        break;
      case 'genderDesc':
        filteredTrainers.sort((a, b) => (b.gender || '').localeCompare(a.gender || ''));
        break;
      default:
        break;
    }

    setMoreAvailable(filteredTrainers.length > 8);
    setFilteredTrainers(filteredTrainers);
    setVisibleTrainers(Math.min(8, filteredTrainers.length));
  };

  const loadMore = () => {
    setVisibleTrainers(prevVisible => prevVisible + 8);
  };

  return (
    <>
      <section className='bg-buttonBgColor'>
        <div className='container text-center'>
          <h2 className='heading text-highlightTextColor'>Find a Trainer</h2>
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
                  className='btn mt-0 rounded-[0px] rounded-r-md border border-redBorder bg-redBorder hover:bg-transparent '
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
            <button
              className='text-white hover:text-red-700 hover:scale-105 m-2 '
              onClick={handleClearSearch}
            >
              Clear
            </button>
          </div>

          <div className='max-w-[600px] mx-auto flex items-center'>
            <select
              className='text-textColor py-2 px-4 border border-black bg-black focus:outline-none focus:border-redBorder cursor-pointer hover:border-redBorder hover:text-white hover:font-bold'
              value={filterDepartment ? filterDepartment : 'Filter By'}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value=''>Filter By</option>
              {availableDepartments.map((department, index) => (
                <option key={index} value={department}>{department}</option>
              ))}
            </select>

            <select
              className='text-textColor py-2 px-4 my-2 mx-8 border border-black bg-black focus:outline-none focus:border-redBorder cursor-pointer hover:border-redBorder hover:text-white hover:font-bold '
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value=''>Sort by</option>
              <option value='nameAsc'>Name (A-Z)</option>
              <option value='nameDesc'>Name (Z-A)</option>
              <option value='departmentAsc'>Department (A-Z)</option>
              <option value='departmentDesc'>Department (Z-A)</option>
              <option value='genderAsc'>Gender (F-M)</option>
              <option value='genderDesc'>Gender (M-F)</option>
            </select>
          </div>
        </div>
      </section>

      <section>
        <div className='container'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 mx-10'>
            {filteredTrainers.slice(0, visibleTrainers).length > 0 ? (
              filteredTrainers.slice(0, visibleTrainers).map(trainer => (
                <TrainerCard key={trainer._id} trainer={trainer} />
              ))
            ) : (
              <div className="col-span-full text-center">
                <h1 className="text-red-500 text-xl">No trainers found</h1>
              </div>
            )}
          </div>

          {filteredTrainers.length > 8 && moreAvailable && (
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
