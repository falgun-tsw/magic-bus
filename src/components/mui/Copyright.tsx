import Link from "./Link";
import Typography from "./Typography";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://clubone.fit/">
                Club One
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}


export default Copyright
