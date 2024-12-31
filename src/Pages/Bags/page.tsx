import { useParams } from "react-router-dom";

interface Props {
    id: string;
}  

export default function Bags() {
    const params = useParams<{id: string}>();
    const id = params.id;

    let URL = "";
    if (id === "1") {
        URL = "手持ちバッグ"; 
    } else if(id === "2") {
        URL = "キャリーバッグ";
    }

    return(
        <>
            <Bag id={URL} />
        </>
    )
}

function Bag(props: Props) {
    return(
        <>
            <p>{props.id}</p>
        </>
    )
}