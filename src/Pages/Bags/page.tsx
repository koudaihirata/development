

interface Props {
    id: string;
}  

export default function Bags() {
    return(
        <>
            <Bag id=""/>
        </>
    )
}

function Bag(props: Props) {
    return(
        <>
            <p>bag: {props.id}</p>
        </>
    )
}