function List( {items} : { items?:Element[]}) {
    return (
        <div>
            {items?.map(item => <>{item}</>)}
        </div>
    );
}

export default List;