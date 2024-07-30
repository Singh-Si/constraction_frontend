import Image from "next/image";

const AcessDeniedPage = () => {

    return <div className="row">
        <Image src="/assets/images/access_denied.svg" alt="access_denied" width={300} height={300}/>
        <h2 className="text-center mt-4">Request access from site admin</h2>
    </div>

}

export default AcessDeniedPage;