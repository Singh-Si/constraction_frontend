import store from "@/store/store";
import { Provider } from "react-redux";
import FullLayout from "@/layouts/FullLayout";
import { useRouter } from "next/router";

const shouldExcludeLayout = (path) => {
  const excludedPaths = [ '/user/login', '/user/register', '/user/verify-otp', '/user/settingup-account', '/user/create-organisation', '/user/create-site'];

  return excludedPaths.includes(path);
};

export default function RootLayout({ children }) {
  const router = useRouter();
  const excludeLayout = shouldExcludeLayout(router.asPath);

  if(!children){
    return <ErrorPage statusCode={404} />;
  }

  if (!excludeLayout) {
    return (
      <Provider store={store}>
        <FullLayout>
          {children}
        </FullLayout>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <main className="dark text-foreground bg-background p-3" id="root">
        {children}
      </main>
    </Provider>
  )
}

export async function getServerSideProps(context) {
  const { token, currentOrganizationId } = nookies.get(context);
  let response;


  if (!token) {
    return {
      redirect: {
        destination: '/user/login',
        permanent: false
      },
    };
  }

  return {

    props: {
      userpermission: response || null
    }
  }
}