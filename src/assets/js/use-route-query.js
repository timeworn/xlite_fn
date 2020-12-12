import { useEffect, useState } from "react";

const useParams = () => {
	const search = window.location.search;
	const [params, setParams] = useState(new URLSearchParams(search));
	useEffect(() => {
		setParams(new URLSearchParams(search));
	}, [search]);
	return params;
};

export default useParams;