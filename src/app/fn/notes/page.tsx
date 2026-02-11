import { permanentRedirect } from "next/navigation";

const RedirectToFn = () => {
    permanentRedirect("/fn");
};

export default RedirectToFn;
