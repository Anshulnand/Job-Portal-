import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPinIcon, Trash2Icon } from "lucide-react";

const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => {},
  isMyJob = false,
}) => {
    console.log("Job Company Data:", job.company);
console.log("Logo URL:", job.company?.logo_url);

  const { user } = useUser();
  return (
    <Card>
      <CardHeader className="flex">
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
            
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && (
            <img src={job.company.logo_url} alt="not shown" className="h-6" />
          )}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}.
      </CardContent>
    </Card>
  );
};

export default JobCard;
