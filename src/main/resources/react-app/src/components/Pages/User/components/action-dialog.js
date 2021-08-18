import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";


const ActionDialog = ({open,title,content, ok,cancel,okAction, cancelAction}) => {
    return (
        <Dialog open={open} onClose={cancelAction}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={okAction}>
                    {ok}
                </Button>
                <Button color="secondary" onClick={cancelAction}>
                    {cancel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ActionDialog;