import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TrainerCard from '../components/Trainer/TrainerCard';
import axiosInstance from '../axiosInstance/axiosInstance';

const FindATrainer = () => {
  const userRole = useSelector((state) => state.user.userRole);
  const [trainers, setTrainers] = useState([]);
  const [visibleTrainers, setVisibleTrainers] = useState(8); // Initial number of trainers to display
  const [moreAvailable, setMoreAvailable] = useState(true); // Flag to indicate if more trainers are available
  const [searchTerm, setSearchTerm] = useState(''); // Search term for trainer name or department
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch trainers when the component mounts
    getTrainers();
  }, []);

  const getTrainers = () => {
    axiosInstance.get('/api/users/get-trainers')
      .then((response) => {
        setTrainers(response.data.data);
        // Set visible trainers based on initial state or filtered state
        setVisibleTrainers(Math.min(8, response.data.data.length));
        setMoreAvailable(response.data.data.length > 8);
      })
      .catch((error) => {
        console.error('Error fetching trainers:', error);
        toast.error('Failed to fetch trainers');
      });
  };

  // Function to handle search button click
  const handleSearch = () => {
    filterTrainers(searchTerm);
  };

  // Function to handle clear search button click
  const handleClearSearch = () => {
    setSearchTerm('');
    getTrainers(); // Reset trainers to original list
  };

  // Function to filter trainers based on search term
  const filterTrainers = (term) => {
    let filteredTrainers = trainers.filter((trainer) =>
      trainer?.username?.toLowerCase().includes(term.toLowerCase()) ||
      trainer?.department?.toLowerCase().includes(term.toLowerCase())
    );

    // Update visible trainers and moreAvailable flag based on filtered data
    setMoreAvailable(filteredTrainers.length > 8);
    setTrainers(filteredTrainers);
    setVisibleTrainers(Math.min(8, filteredTrainers.length)); // Show first page of filtered results
  };

  // Function to load more trainers
  const loadMore = () => {
    setVisibleTrainers((prevVisible) => prevVisible + 8); // Increase visible trainers by 8
  };

  return (
    <>
      <section className='bg-buttonBgColor'>
        <div className='container text-center'>
          <h2 className='heading'>Find a Trainer</h2>
          <div className=' max-w-[600px]  mx-auto  rounded-md flex items-center justify-between py-10'>
            <div className='w-full  bg-black rounded-md flex items-center justify-between '>
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
              className='text-white  hover:text-redBorder m-2 '
              onClick={handleClearSearch}
            >
              Clear
            </button>
          </div>

        </div>
      </section>

      <section>
        <div className='container'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 mx-10 '>
            {trainers.slice(0, visibleTrainers).length > 0 ? (
              trainers.slice(0, visibleTrainers).map((trainer) => (
                <TrainerCard key={trainer._id} trainer={trainer} />
              ))
            ) : (
              <div className="col-span-full text-center">
                <h1 className="text-red-500 text-xl">trainers not found</h1>
              </div>
            )}
          </div>

          {moreAvailable && (
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
