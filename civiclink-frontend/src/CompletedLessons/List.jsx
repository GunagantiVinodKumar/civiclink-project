function List(){
    const fruits=[{id:1,name:"avacados" , protein:2},
                  {id:1.5,name:"1Grape",protein:0.4},
                  {id:2,name:"Lemons",protein:1.11},
                  {id:3,name:"Dragon",protein:4},
                  {id:4,name:"Bananas",protein:3}
                ];

    const lowprotein= fruits.filter(fruit => fruit.protein <= 2);


    // fruits.sort((a,b)=>b.name.localeCompare(a.name));
    // fruits.sort((a,b) => b.protein - a.protein)
    const listitems=lowprotein.map(lowprotein  => <li key={lowprotein.id}>
                                                {lowprotein.name}: &nbsp;
                                                <b>{lowprotein.protein}</b></li>)

    return(<ol>{listitems}</ol>);
}
export default List