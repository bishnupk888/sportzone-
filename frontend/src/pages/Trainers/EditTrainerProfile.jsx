import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/images/userImage.jpg';
import axiosInstance from '../../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';
import UploadWidget from '../../components/popupComponents/UploadWidget';

export default function EditTrainerProfile() {
    const user = useSelector((state) => state.user);
    const [trainerData, setTrainerData] = useState({
        username: '',
        email: '',
        phone: '',
        gender: '',
        department: '',
        fee: '',
        location: '',
        profileImage: '',
        certificate:'',
        experience: [
            { institution: '', duration: '' }
        ],
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.userRole && user.userId) {
            axiosInstance.get(`/api/trainers/${user.userId}`)
                .then((response) => {
                    setTrainerData(response.data.data);
                })
                .catch((error) => {
                    console.error('Error fetching trainer data:', error);
                    toast.error("Failed to fetch trainer data");
                });
        }
    }, [user]);
    const handleCertificateUpload =async()=>{
        console.log("certificate upload");
    }
    const handleImageUpload = async (url) => {
        try {
                axiosInstance.patch(`/api/trainers/${user.userId}/profile-image`,{imageUrl:url}).then((response)=>{
                    console.log('Profile image updated:', response.data);
                    setTrainerData(prevData => ({
                        ...prevData,
                        profileImage: url
                    }));
                })
                .catch((error)=>{
                    console.log(error);
                })
                
        } catch (error) {
            console.error('Error updating profile image:', error);
        }
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;

        if (name.startsWith("experience")) {
            const updatedExperience = trainerData.experience.map((exp, idx) =>
                idx === index ? { ...exp, [name.split(".")[1]]: value } : exp
            );

            setTrainerData(prevData => ({
                ...prevData,
                experience: updatedExperience
            }));
        } else {
            setTrainerData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!trainerData.username) newErrors.username = "Full name is required";
        if (!trainerData.email) newErrors.email = "Email address is required";
        if (!trainerData.phone) newErrors.phone = "Phone number is required";
        if (!trainerData.gender) newErrors.gender = "Gender is required";
        if (!trainerData.department) newErrors.department = "Department is required";
        if (!trainerData.fee) newErrors.fee = "Fee is required";
        if (!trainerData.location) newErrors.location = "Location is required";
        if (!trainerData.experience || trainerData.experience.length === 0) newErrors.experience = "Experience is required";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("in handle submit");
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        axiosInstance.put(`/api/trainers/${user.userId}`, trainerData)
            .then((response) => {
                console.log("in response");
                toast.success("Trainer data updated successfully");
                navigate('/trainer/profile');
            })
            .catch((error) => {
                console.error('Error updating trainer data:', error);
                toast.error("Failed to update trainer data");
            });
    };

    const handleCancel = () => {
        navigate('/trainer-profile');
    };

    // const addExperienceField = () => {
    //     setTrainerData(prevData => ({
    //         ...prevData,
    //         experience: [
    //             ...prevData.experience,
    //             { institution: '', duration: '' }
    //         ],
    //     }));
    // };

    // const removeExperienceField = (indexToRemove) => {
    //     setTrainerData(prevData => ({
    //         ...prevData,
    //         experience: prevData.experience.filter((exp, index) => index !== indexToRemove),
    //     }));
    // };

    return (
        <div className='px-[5%] py-[5%] bg-black text-white'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="pb-12">
                        <h2 className="text-[30px] text-base font-bold lg:text-[40px] leading-7 text-textColor">Update Trainer Profile</h2>
                        <p className="mt-5 text-sm leading-6 text-textColor">
                            Complete full profile information for verification.
                        </p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 text-textColor">
                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-xl font-medium leading-6 text-textColor">
                                    Profile Image
                                </label>
                                <div className="mt-2 flex items-center">
                                    <div className='relative w-40 h-40 flex items-center justify-center'>
                                        <img
                                            src={ trainerData?.profileImage || defaultImage}
                                            alt='trainer-image'
                                            className='lg:absolute top-5 w-28 h-28 rounded-full border-2 border-redBorder'
                                        />
                                    </div>
                                    <UploadWidget onUpload={handleImageUpload} />

                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="username" className="block text-xl font-medium leading-6">
                                    Full name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder='Enter full name'
                                        value={trainerData.username || ''}
                                        onChange={handleInputChange}
                                        className={`block w-full rounded-md border ${errors.username ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-textColor focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                    />
                                    {errors.username && <span className="text-red-500">{errors.username}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-xl font-medium leading-6">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder='Enter email'
                                        value={trainerData.email || ''}
                                        onChange={handleInputChange}
                                        className={`block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                    />
                                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="phone" className="block text-xl font-medium leading-6">
                                    Phone
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="number"
                                        placeholder='Enter phone number'
                                        value={trainerData.phone || ''}
                                        onChange={handleInputChange}
                                        className={`block w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                    />
                                    {errors.phone && <span className="text-red-500">{errors.phone}</span>}
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="interests" className="block text-xl font-medium leading-6">
                                    About
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="interests"
                                        name="interests"
                                        rows={3}
                                        placeholder={(Array.isArray(trainerData.interests) && trainerData.interests.length > 0) ? trainerData.interests.join(', ') : 'Add your favorite sports (use comma if multiple inerests)'}
                                        className="block w-full lg:text-[16px] rounded-md border border-redBorder bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-textColor sm:text-sm sm:leading-6 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder px-3"
                                        defaultValue={trainerData.interests}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="gender" className="block text-xl font-medium leading-6">
                                    Gender
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={trainerData.gender || ''}
                                        onChange={handleInputChange}
                                        className={`block w-full rounded-md border ${errors.gender ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:max-w-xs sm:text-sm sm:leading-6 px-2`}
                                    >
                                        <option value="" disabled style={{ backgroundColor: 'black' }}>
                                            Select gender
                                        </option>
                                        <option style={{ backgroundColor: 'black' }} value="Male">Male</option>
                                        <option style={{ backgroundColor: 'black' }} value="Female">Female</option>
                                        <option style={{ backgroundColor: 'black' }} value="Other">Other</option>
                                    </select>
                                    {errors.gender && <span className="text-red-500">{errors.gender}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="department" className="block text-xl font-medium leading-6">
                                    Department
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="department"
                                        name="department"
                                        type="text"
                                        placeholder='Enter department'
                                        value={trainerData.department || ''}
                                        onChange={handleInputChange}
                                        className={`block w-full rounded-md border ${errors.department ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                    />
                                    {errors.department && <span className="text-red-500">{errors.department}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="fee" className="block text-xl font-medium leading-6">
                                    Fee
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="fee"
                                        name="fee"
                                        type="text"
                                        placeholder='Enter fee'
                                        value={trainerData.fee || ''}
                                        onChange={handleInputChange}
                                        className={`block w-full rounded-md border ${errors.fee ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                    />
                                    {errors.fee && <span className="text-red-500">{errors.fee}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="location" className="block text-xl font-medium leading-6">
                                    Location
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        placeholder='Enter location'
                                        value={trainerData.location || ''}
                                        onChange={handleInputChange}
                                        className={`block w-full rounded-md border ${errors.location ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                    />
                                    {errors.location && <span className="text-red-500">{errors.location}</span>}
                                </div>
                            </div>

                            {/* <div className="sm:col-span-6">
                                <label className="block text-xl font-medium leading-6">
                                    Experience
                                </label>
                                <div className="mt-2 space-y-4">
                                    {trainerData.experience.map((exp, index) => (
                                        <div key={index} className="flex items-center">
                                            <input
                                                type="text"
                                                name={`experience.${index}.institution`}
                                                placeholder="Institution"
                                                value={exp.institution}
                                                onChange={(e) => handleInputChange(e, index)}
                                                className={`block w-2/3 rounded-md border ${errors.experience ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2 mr-2`}
                                            />
                                            <input
                                                type="text"
                                                name={`experience.${index}.duration`}
                                                placeholder="Duration"
                                                value={exp.duration}
                                                onChange={(e) => handleInputChange(e, index)}
                                                className={`block w-1/3 rounded-md border ${errors.experience ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                            />
                                            {errors.experience && <span className="text-red-500">{errors.experience}</span>}
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    className="ml-2 text-sm font-medium text-red-500 hover:text-red-700 focus:outline-none focus:text-red-700"
                                                    onClick={() => removeExperienceField(index)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="text-sm font-medium text-red-500 hover:text-red-700 focus:outline-none"
                                        onClick={addExperienceField}
                                    >
                                        + Add Experience
                                    </button>
                                </div>
                            </div> */}

                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-xl font-medium leading-6 text-textColor">
                                    Certificate
                                </label>
                                <div className="mt-2 flex items-center">
                                    <div className='relative w-40 h-40 flex items-center justify-center'>
                                        <img
                                            src={ trainerData?.certificate || ''}
                                            alt='trainer-certificate'
                                            className='lg:absolute top-5 w-40 h-20 border-2 border-redBorder'
                                        />
                                    </div>
                                    <UploadWidget onUpload={handleCertificateUpload} />

                                </div>
                            </div>
                        </div>
                        <div className="mt-12 space-x-4 sm:space-x-12">
                            <button
                                type="submit"
                                className="w-40 h-14 text-base font-medium text-textColor border border-redBorder bg-red-500 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 rounded-md shadow-xl hover:scale-95"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="w-40 h-14 text-base font-medium text-textColor border border-redBorder bg-transparent hover:bg-redBorder focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 rounded-md shadow-xl hover:scale-95"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
