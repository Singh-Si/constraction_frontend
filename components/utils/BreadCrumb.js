import { useRouter } from 'next/router';

const BreadCrumb = (props) => {
    const router = useRouter();

    const pagesToHideBreadcrumb = ['/'];

    // Check if the current page should hide the breadcrumb
    const shouldHideBreadcrumb = !pagesToHideBreadcrumb.includes(router.pathname);

    return (
        <>
            {shouldHideBreadcrumb && (
                <h5 className='d-flex align-items-center ps-4' style={{ color: "#7D7A7A", height: 51, background: "#EAEAEA" }}>
                    {props?.breadcrumbs[1]?.title}
                </h5>
            )}
        </>
    );
}

export default BreadCrumb