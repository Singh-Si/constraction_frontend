import { Body, Container, Head, Html, Link, Preview, Section, Text } from "@react-email/components";
import Image from "next/image";


export default function OTPEmailTemplate() {
    return (
        <Html>
            <Head />
            <Preview>Verification Code</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section>
                        <Text style={text}>Hi,</Text>
                        <Text style={text}>Someone recently requested a OTP for your account. If this was you, This is your verification code:</Text>
                        <Text style={heading}>1234</Text>
                        <Text style={text}>If you don&apos;t want to Login or didn&apos;t request this, just ignore and delete this Email.</Text>
                        <Text style={text}>To keep your account secure, please don&apos;t forward this email to anyone.&nbsp;
                            <Link style={anchor} href="#">more security tips.</Link>
                        </Text>
                    </Section>
                    {/* <img src="https://img.freepik.com/premium-vector/simple-urban-city-town-design-element-flat-illustration-set_133260-3045.jpg?w=740"/> */}
                    <img src="https://t4.ftcdn.net/jpg/02/07/33/01/240_F_207330168_yeIkGximas341ocaW9oqeR31idIXZ7wO.jpg"/>
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: "#F6F9FC",
    padding: "10px 0",
};

const container = {
    backgroundColor: "#FFFFFF",
    border: "1px solid #F0F0F0",
    padding: "45px",
};

const text = {
    fontSize: "16px",
    fontFamily: "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: "300",
    color: "#404040",
    lineHeight: "26px",
};

const heading = {
    fontSize: "25px",
    color: "#377DFF",
    lineHeight: 1.3,
    fontWeight: 600,
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "10px"
}

const anchor = {
    textDecoration: "none",
};