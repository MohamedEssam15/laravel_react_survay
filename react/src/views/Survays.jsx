import PageComponent from "../components/PageComponent";
import SurvayListItem from "../components/SurvayListItem";
import { useStateContext } from "../contexts/ContextProvider";


export default function Survay(){
 const {Survays} = useStateContext()
console.log(Survays);
    const onDeleteClick = (ev)=>{
        ev.preventDefault();
        console.log('on Delete Link')
    }
    return(
      <PageComponent title="Survays">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">

            {Survays.map((survey)=>(
                <SurvayListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick} />
            ))}
        </div>
      </PageComponent>
    );
}
