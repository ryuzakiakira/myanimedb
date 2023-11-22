import { useRouteError } from "react-router-dom";

import PageContent from "../components/UI/PageContent";
import MainNavigation from "../components/UI/MainNavigation";

function ErrorPage() {
    const error = useRouteError();

    let title = "Something went wrong!";
    let message = "Something unexpected happened, please try again."

    if (error.status === 404) {
        title = "404 Page not found!"
        message = "The page you're trying to reach does not exist..."
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={title} >
                <p>{message}</p>
            </PageContent>
        </>
    )
}

export default ErrorPage;