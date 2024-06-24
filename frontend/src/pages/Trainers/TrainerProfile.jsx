import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/images/userImage.jpg';
import axiosInstance from '../../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';
import UploadWidget from '../../components/popupComponents/UploadWidget';
import { setUserData } from '../../Redux/features/userSlice';

export default function EditTrainerProfile() {
    const user = useSelector((state) => state.user);
    const [initialtrainerData, setInintialTrainerData] = useState([])
    const [trainerData, setTrainerData] = useState({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || '',
        department: user.department || '',
        fee: user.fee || '',
        age: user.age || '',
        location: user.location || '',
        profileImage: user.profileImage || '',
        about: user.about || '',
        certificate: user.certificate || '',
        experience: user.experience || [{ institution: '', duration: '' }],

    });



    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && user.userRole && user.userId) {
            const fetchTrainerData = async () => {
                try {
                    const response = await axiosInstance.get(`/api/trainers/${user.userId}`);
                    setTrainerData(response.data.data);
                    setInintialTrainerData(response.data.data)

                } catch (error) {
                    console.error('Error fetching trainer data:', error);
                    toast.error("Failed to fetch trainer data");
                }
            };

            fetchTrainerData();
        }
    }, [user]);

    const handleCertificateUpload = async (certificateUrl) => {
        try {
            const response = await axiosInstance.patch(`/api/trainers/${user.userId}/certificate`, { certificateUrl });
            console.log('Certificate uploaded:', response.data);

            setTrainerData((prevData) => ({
                ...prevData,
                certificate: certificateUrl,
            }));

            dispatch(setUserData({
                ...trainerData,
                certificate: certificateUrl,
            }));

            toast.success("Successfully uploaded certificate");
        } catch (error) {
            toast.error("Certificate upload failed");
            console.error('Error uploading certificate:', error);
        }
    };

    const handleImageUpload = async (url) => {
        try {
            const response = await axiosInstance.patch(`/api/trainers/${user.userId}/profile-image`, { imageUrl: url });
            console.log('Profile image updated:', response.data);

            setTrainerData((prevData) => ({
                ...prevData,
                profileImage: url,
            }));

            dispatch(setUserData({
                ...trainerData,
                profileImage: url,
            }));

            toast.success("Successfully updated image");
        } catch (error) {
            toast.error("Image updation failed");
            console.error(error);
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
        if (!trainerData.age) newErrors.age = "Age is required";
        if (!trainerData.about) newErrors.about = "About is required";
        if (!trainerData.location) newErrors.location = "Location is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axiosInstance.put(`/api/trainers/${user.userId}`, trainerData);
            console.log("API call successful:", response.data);
            setTrainerData(response.data.data);
            dispatch(setUserData(trainerData));
            toast.success("Trainer data updated successfully");
        } catch (error) {
            console.error('Error updating trainer data:', error);
            toast.error("Failed to update trainer data");
        }
    };

    const handleEmailClick = () => {
       toast.warning("email cannot be edited")
    };

    const handleCancel = () => {
        setTrainerData(initialtrainerData)
    };

    return (
        <div className='px-[5%] py-[5%] bg-black text-white'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="pb-12">
                        <h2 className=" text-3xl lg:text-4xl font-bold  leading-7 text-textColor">Trainer Profile</h2>
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
                                            src={trainerData?.profileImage || defaultImage}
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
                                        placeholder="Enter email"
                                        value={trainerData.email || ''}
                                        onClick={handleEmailClick}
                                        readOnly
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

                            <div className="sm:col-span-3">
                                <label htmlFor="gender" className="block text-xl font-medium leading-6">
                                    Gender
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={trainerData.gender}
                                        onChange={handleInputChange}
                                        className={`block w-full rounded-md border ${errors.gender ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                    >
                                        <option value="" disabled>Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.gender && <span className="text-red-500">{errors.gender}</span>}
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="fee" className="block text-xl font-medium leading-6">
                                    Age
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="age"
                                        name="age"
                                        type="number"
                                        placeholder='Enter your age'
                                        value={trainerData.age || ''}
                                        onChange={handleInputChange}
                                        className={`block w-full rounded-md border ${errors.age ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-textColor focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                    />
                                    {errors.age && <span className="text-red-500">{errors.age}</span>}
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="department" className="block text-xl font-medium leading-6">
                                    Department
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="department"
                                        id="department"
                                        placeholder='Enter department'
                                        value={trainerData.department || ''}
                                        onChange={handleInputChange}
                                        className={`block w-full rounded-md border ${errors.department ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-textColor focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                    />
                                    {errors.department && <span className="text-red-500">{errors.department}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="fee" className="block text-xl font-medium leading-6">
                                    Fee/Hour
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="fee"
                                        name="fee"
                                        type="number"
                                        placeholder='Enter fee per session'
                                        value={trainerData.fee || ''}
                                        onChange={handleInputChange}
                                        className={`block w-full rounded-md border ${errors.fee ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-textColor focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                    />
                                    {errors.fee && <span className="text-red-500">{errors.fee}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-4">
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

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-xl font-medium leading-6">
                                    About
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        placeholder='Tell us about yourself'
                                        value={trainerData.about || ''}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className={`block w-full rounded-md border ${errors.about ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                    />
                                    {errors.about && <span className="text-red-500">{errors.about}</span>}
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="certificate" className="block text-xl font-medium leading-6">
                                    Certificate
                                </label>
                                <div className="mt-2 flex items-center">
                                    <div className="w-32">
                                        {trainerData.certificate && (
                                            <img src={trainerData.certificate} alt="Certificate" className="rounded-md shadow-md" />
                                        )}
                                    </div>
                                    <UploadWidget onUpload={handleCertificateUpload} />
                                </div>
                            </div>

                            {/* <div className="col-span-full">
                                <label htmlFor="experience" className="block text-xl font-medium leading-6">
                                    Experience
                                </label>
                                {trainerData.experience.map((exp, index) => (
                                    <div key={index} className="mt-2 flex gap-x-4">
                                        <input
                                            type="text"
                                            name={`experience.${index}.institution`}
                                            placeholder='Institution'
                                            value={exp.institution}
                                            onChange={(e) => handleInputChange(e, index)}
                                            className={`block w-full rounded-md border ${errors[`experience.${index}.institution`] ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                        />
                                        <input
                                            type="text"
                                            name={`experience.${index}.duration`}
                                            placeholder='Duration'
                                            value={exp.duration}
                                            onChange={(e) => handleInputChange(e, index)}
                                            className={`block w-full rounded-md border ${errors[`experience.${index}.duration`] ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setTrainerData(prevData => ({
                                        ...prevData,
                                        experience: [...prevData.experience, { institution: '', duration: '' }]
                                    }))}
                                    className="mt-2 text-textColor hover:text-red-500"
                                >
                                    Add more experience
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-xl font-semibold leading-6 text-textColor hover:text-redBorder hover:scale-90"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-black border border-redBorder px-5 py-3 text-xl font-semibold text-white shadow-sm hover:bg-redBorder hover:scale-90 "
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}



