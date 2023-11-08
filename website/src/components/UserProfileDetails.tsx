import React from 'react';

export default function UserProfileDetails(props: any) {
  const user = props;

  if (user === undefined) return null;
  return (
    <div className="flex flex-col">
      <div className="flex justify-center m-4 p-2 ">
        <div className="border rounded p-1">
          <img
            src={user.avatar}
            alt="avatar"
            className="rounded-full h-24 w-24 mx-auto"
          />
        </div>
        <div className="flex flex-col p-2 border rounded">
          <p className="font-semibold text-base">{user.fullName}</p>
          <p className="font-semibold text-base">{user.email}</p>
          <p className="font-semibold text-base">{user.role}</p>
        </div>
      </div>
      <div className=" h-[350px] gap-3 flex overflow-auto">
        {user.profilePhotos.map((photo: string) => {
          return (
            <img
              src={photo}
              alt="profile"
              className="p-3 h-auto min-w-[75%] lg:min-w-[40%] border object-center object-cover rounded"
            />
          );
        })}
      </div>
    </div>
  );
}
