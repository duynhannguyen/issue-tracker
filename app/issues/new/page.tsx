import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { Metadata } from "next";
import { string } from "zod";
import { redirect } from "next/navigation";
import { ErrorMessage } from "@/app/_components";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const groupId = searchParams.group ? parseInt(searchParams.group) : NaN;
  if (!groupId) {
    return (
      <ErrorMessage>
        <div className="flex flex-col justify-center items-center gap-2 ">
          <span className=" font-semibold ">
            Failed to access the page, please go back to dashboard then try
            again
          </span>

          <a
            className="text-white border px-2 py-2 rounded-lg bg-primary/70 "
            href="/dashboard/groups"
          >
            Back to dashboard
          </a>
        </div>
      </ErrorMessage>
    );
  }
  return <IssueForm />;
};

export const metadata: Metadata = {
  title: "Issue Tracker - New Issue",
  description: "Create new issue",
};

export default NewIssuePage;
