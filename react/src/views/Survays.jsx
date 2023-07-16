import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../components/PageComponent";
import SurvayListItem from "../components/SurvayListItem";
import TButton from "../components/core/Tbutton";
import { useStateContext } from "../contexts/ContextProvider";


export default function Survay(){
 const {Survays} = useStateContext()
console.log(Survays);
    const onDeleteClick = (ev)=>{
        ev.preventDefault();
        console.log('on Delete Link')
    }
    return(
      <PageComponent title="Survays" buttons={(<TButton color="green" to="/survays/create">
        <PlusCircleIcon className="h-6 w-6 mr-2"/>
        Create new
      </TButton>)}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">

            {Survays.map((survey)=>(
                <SurvayListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick} />
            ))}
        </div>
      </PageComponent>
    );
}
