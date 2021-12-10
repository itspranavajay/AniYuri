import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/card/Container";
import Layout from "../../components/Layout";
import { asyncDataAction } from "../../redux/actions/asyncDataAction";
import { URL } from "../../utils/URLS";
import { Discover } from "../../utils/data";
const Movie = () => {
	const { data } = useSelector((state) => state);
	const router = useRouter();
	const { pages } = router.query;
	const dispatch = useDispatch();

	useEffect(() => {
		if (pages) {
			var MovieURL = URL.MOVIE + pages;
			dispatch(asyncDataAction(MovieURL));
		}
	}, [pages]);

	return (
		<Layout title={"Movie"}>
			<Container
				Data={data.results}
				heading={"Movie"}
				Icon={Discover[1].icon}
				page={[pages]}
			/>
		</Layout>
	);
};

export default Movie;
