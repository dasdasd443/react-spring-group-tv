import { Card, CardHeader } from "@material-ui/core";


const DashBoardCalendar = ({style}) => {
    return (
        <Card style={style}>
            <CardHeader title={<div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <span>Calen<span style={{color:'#FD2E2E'}}>dar</span></span>
                </div>
                <hr/>
            </div>}/>
        </Card>
    );
}

export default DashBoardCalendar;