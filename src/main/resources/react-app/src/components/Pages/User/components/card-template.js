import { CardContent,Card, CardHeader } from "@material-ui/core"

const CardTemplate = ({title,content}) => {
    return (
        <Card>
            <CardHeader title={<div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    {title}
                </div>
                <hr/>
            </div>}/>
            <CardContent style={{width:'100%',display:'flex',gap:'1rem'}}>
                {content}
            </CardContent>
        </Card>
    )
}

export default CardTemplate;