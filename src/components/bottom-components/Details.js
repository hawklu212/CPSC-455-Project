import {Box, Grid, Slider, TextField, Typography} from "@mui/material";

export default function Details(props){
    return (<Grid container space={1}>
        <Grid item xs={12}>
            <Typography variant={'h5'}>Preferences</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant={'h6'}>Maximum Allowable Incline</Typography>
        </Grid>
        <Grid item xs={6}>
            <Slider aria-label={'Max incline'}
                    defaultValue={5}
                    step={1}
                    marks
                    min={0}
                    max={15} />
        </Grid>
        <Grid item xs={6}>
            <Typography variant={'h6'}>Maximum Allowable Elevation</Typography>
        </Grid>
        <Grid item xs={6}>
            <Slider aria-label={'Max Elevation'}
                    defaultValue={20}
                    step={5}
                    marks
                    min={0}
                    max={50} />
        </Grid>
    </Grid>);
}

function auto_grow(referen) {
    if (referen.current!=null){
    referen.current.style.height = "20px";
    referen.current.style.height = (referen.current.scrollHeight)+"px";
    }
}