import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getFriends } from "../lib/api";
import { MessageSquareIcon } from "lucide-react";
import { Link } from "react-router";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const queryClient = useQueryClient();

  const { data: friendsList, isLoading } = useQuery({
    queryKey: ["friendsList"],
    queryFn: getFriends,
  });

  useEffect(() => {
    setFriends(friendsList);
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex justify-center flex-col">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Friends
        </h1>

        {friends &&
          friends.length > 0 &&
          friends.map((friend) => (
            <div className="card bg-base-200 shadow-sm" key={friend._id}>
              <div className="card-body p-4">
                <div className="flex items-start gap-3">
                  <div className="avatar mt-1 size-10 rounded-full">
                    <img src={friend.profilePic} alt={friend.fullName} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{friend.fullName}</h3>
                  </div>
                  <Link to={`/chat/${friend._id}`}>
                    <div className="badge badge-success h-10 flex items-center">
                      <MessageSquareIcon className="size-5 mr-1" />
                      Message
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Friends;
