import { Card, CardHeader } from "@material-ui/core";

const SalesStatistics = ({style}) => {
    return (
        <Card style={style}>
            <CardHeader title={<div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <span>Sales Statis<span style={{color:'#FD2E2E'}}>tics</span></span>
                </div>
                <hr/>
            </div>}/>
        </Card>
    )
}

export default SalesStatistics;