

type task = {
    task: string
    onRemove: () => void;
    onAdd: () => void;
}

export default function Task(props: task) {
    return(
        <>
            <section style={{width:'300px',height:'150px',border:'1px solid #000'}}>
                <h3>{props.task}</h3>
                <div>
                    <button onClick={props.onAdd}>
                        カバンに入れた
                    </button>
                    <button onClick={props.onRemove}>
                        持っていかない
                    </button>
                </div>
            </section>
        </>
    )
}