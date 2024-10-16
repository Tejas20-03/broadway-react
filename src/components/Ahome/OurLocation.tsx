import { Box, Container, Grid, Typography } from "@mui/material";
import { Poppins } from "next/font/google";
import { colors } from "../../constant/Colors";
import Image from "next/image";
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300","400","600", "700"],
  });
export default function OurLocation() {
    const data = [ 
        "Karachi",
        "Lahore",
        "Islambad",
        "Rawalpindi",
        "Sialkot",
        "Multan",
        "Faisalabad",
        "Hyderabad"
    ]
    return(
        <>
        <Box sx={style.main} >
            <Container sx={style.container} >
        <Grid container columnSpacing={4} >
            <Grid item md={6} xs={12}>
                <Box sx={style.imgBox} >
                    <Image style={{borderRadius:"10px",width:"80%",height:"80%"}} alt='oops' src={'/ourLoc.jpg'} width={600} height={450} />
                </Box>
            </Grid>
            <Grid item md={6} xs={12} sx={style.grid} >
                <Typography sx={style.locationHeading} className={poppins.className} >Our Location</Typography>
                <Box sx={style.mainLocationBox} >
                    {data.map((locations,index)=>{
                        return(
                            <>
                            <a className="locationButton" key={index} >{locations}</a>
                            </>
                        )
                    })}
                </Box>
            </Grid>
        </Grid>
        </Container>
        </Box>
        </>
    )
};

const style = {
    main:{
        width:"100%",
        height:"100%",
        paddingY:"50px",
        
    },
    container:{
        maxWidth:{lg:"1400px"}
    },
 
    imgBox:{
width:"100%",
height:"auto",
        marginTop:"50px",
        borderRadius:"20px",
        display:"flex",
        justifyContent:"center",
        alignItems:"start"
    },
    mainLocationBox:{
        width:"80%",
        height:"100%",
        display:"block",
        justifyContent:"space-around",
        gap:"14px"
    },
    locationHeading:{
        color:colors.broadwayAboutHeadingColor,
        fontSize: "32px",
        fontWeight: 300,
        marginLeft: 0,
        marginY:"25px",
        width:"100%"
    },
    grid:{
        display:"flex",
        flexDirection:"column",
    
        justifyContent:"start"
    }
}