import React from 'react'

const MyBookings = () => {
  const data = [
    {
      name: "Steven Jobs",
      email: "jobs@sailboatui.com",
      state: "Active",
      role: "Product Designer",
      teams: ["Design", "Product", "Develop"],
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Steven Jobs",
      email: "jobs@sailboatui.com",
      state: "Active",
      role: "Product Designer",
      teams: ["Design", "Product", "Develop"],
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Steven Jobs",
      email: "jobs@sailboatui.com",
      state: "Active",
      role: "Product Designer",
      teams: ["Design", "Product", "Develop"],
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  return (
    <div className='m-10'>
      <h1 className='text-white text-2xl my-4'> MY BOOKINGS </h1>
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md ">
      <table className="w-full border-collapse bg-black text-left text-sm text-gray-500">
        <thead className="bg-black text-textColor">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium ">Trainer Name</th>
            <th scope="col" className="px-6 py-4 font-medium ">Date</th>
            <th scope="col" className="px-6 py-4 font-medium ">Slot</th>
            <th scope="col" className="px-6 py-4 font-medium ">Amount</th>
            <th scope="col" className="px-6 py-4 font-medium ">Booking Status</th>
            <th scope="col" className="px-6 py-4 font-medium ">Training Status</th>

          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-buttonBgColor">
              <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                <div className="relative h-10 w-10">
                  <img
                    className="h-full w-full rounded-full object-cover object-center"
                    src={item.image}
                    alt=""
                  />
                  {/* <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-700">{item.name}</div>
                  <div className="text-gray-400">{item.email}</div>
                </div>
              </th>
              
              <td className="px-6 py-4">{item.role}</td>
              <td className="px-6 py-4">{item.role}</td>
              <td className="px-6 py-4">{item.role}</td>


              {/* <td className="px-6 py-4">
                <div className="flex gap-2">
                  {item.teams.map((team, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center gap-1 rounded-full bg-${team.toLowerCase()}-50 px-2 py-1 text-xs font-semibold text-${team.toLowerCase()}-600`}
                    >
                      {team}
                    </span>
                  ))}
                </div>
              </td> */}
              <td className="px-6 py-4">
                <span
                  className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                  {item.state}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                  {item.state}
                </span>
              </td>
              

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
)}

export default MyBookings

