import {Card} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const style = {
    minWidth: 180
}
export default function ProfileBonus({bonus}) {
    const {name, money, projectName, projectId = 1} = bonus;
    return <div className="ml-3 mt-2">
        <Card className="p-3" style={style}>
            <NavLink to={`/projects/${projectId}`}>{projectName}</NavLink>
            <h5>{name}</h5>
            <span>{money}у.е.</span>
        </Card>
    </div>
}
