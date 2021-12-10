import Navbar from "../components/nav/Navbar";
import "../styles/globals.css";
import { PersistGate } from "redux-persist/integration/react";
import { Store, Persistor } from "../redux/store";
import { Provider, useSelector } from "react-redux";
import Sidebar from "../components/sidebar/sidebar";
import "../styles/svg.css";
import Head from "next/head";
import { ToastContainer, toast, Flip, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import countapi from "countapi-js";

const url = "https://t.me/aniyurisupport";

const Msg = ({ resumeId }) => {
	return (
		<div className="flex flex-col">
			<span> You were watching </span>
			<span className={"uppercase font-bold text-xl"}>
				{resumeId[0]?.split("-").join(" ")}
			</span>
			<span>
				To Continue Press <span className="text-yellow-300 text-xl "> here </span>
			</span>
		</div>
	);
};


const App = ({ Component, pageProps }) => {
	const [visit, setVisit] = useState(0);
	const { theme, resumeId } = useSelector((state) => state);
	const router = useRouter();
	useEffect(() => {
		console.log(
			"%c AniYuri! ",
			"background: #222; color:#4198db ;font-size:50px"
                );
		localStorage.removeItem("persist:root");
		if (resumeId) {
			toast.info(<Msg resumeId={resumeId.data} />);
		}

		countapi
			.update("aniyuri.vercel.app", process.env.COUNT_API_KEY, 1)
			.then((result) => {
				setVisit(result.value);
			});
	}, []);
	return (
		<div className={`${theme.background}  `}>
			<Head>
				<meta charset="utf-8" />
				<link rel="icon" href={"/favicon.ico"} />
				<link rel="manifest" href="/manifest.json" />
				<link
					rel="apple-touch-icon"
					sizes="512x512"
					href="/logo1.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="192x192"
					href="/logo2.png"
				/>
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<meta name="theme-color" content="#1a1c20" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#000000" />
				<meta name="description" content="Premium anime streaming experience" />
                                <meta name="keywords" content="Watching,Popular,Streaming,Free,Fast,1080p"
                                />
                        </Head>
			<Sidebar visit={visit} />
			<div className="flex justify-between">
				<Navbar visit={visit} /> <Component {...pageProps} />
			</div>
			<ToastContainer
				position={"top-center"}
				onClick={() =>
					router.push(`/watching/${resumeId.data[0]}/${resumeId.data[1]}`)
				}
				autoClose={5000}
				transition={Slide}
				draggablePercent={30}
			/>
		</div>
	);
};

const MYapp = ({ Component, pageProps }) => (
	<Provider store={Store}>
		<PersistGate loading={null} persistor={Persistor}>
			<App Component={Component} pageProps={pageProps} />
		</PersistGate>
	</Provider>
);
export default MYapp;
