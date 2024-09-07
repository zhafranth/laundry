import React from "react";
import dynamic from "next/dynamic";

const FormOutcome = dynamic(() => import("../_components/FormOutcome"));

const CreateOutcomePage = () => <FormOutcome />;

export default CreateOutcomePage;
