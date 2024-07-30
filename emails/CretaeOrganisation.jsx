import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

export const CreateOrganisationEmail = ({email ,name , phone}) => {
  return (
    <Html>
      <Head />
      <Preview>Create Organisation Successfully </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            {/* <Img src={imgURL} /> */}
            {/* <Img src={`${baseUrl}/public/assets/images/congrates.jpg`} /> */}
            <h1>🎉🎉Congratulations🎉🎉</h1>
          </Section>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>Hey ,</Text>
            <Text style={paragraph}>
              You have successfully created your Organisation.
            </Text>
            <Text style={paragraph}>

            </Text>
            <Text style={paragraph}>
              <h4>Here is Your Details,</h4>
              <h4>Organization Name: <span style={span}>{name}</span></h4>
              <h4>Email: <span style={span}>{email}</span></h4>
              <h4>Phone Number: <span style={span}>{phone}</span></h4>
            </Text>
            <Text style={paragraph}>
              Thanks,
              <br />
              Solis Reality Team
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
          <Row>
            <Column align="right" style={{ width: '50%', paddingRight: '8px' }}>
            </Column>
            <Column align="left" style={{ width: '50%', paddingLeft: '8px' }}>
            </Column>
          </Row>
        </Section>
      </Body>
    </Html>
  );
};

export default CreateOrganisationEmail;

const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif';

const main = {
  backgroundColor: '#efeef1',
  fontFamily,
};
const span = {
  color: '#377dff',
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 16,
};

const container = {
  width: '580px',
  margin: '30px auto',
  backgroundColor: '#ffffff',
};

const footer = {
  width: '580px',
  margin: '0 auto',
};

const content = {
  padding: '5px 50px 10px 60px',
};

const logo = {
  display: 'flex',
  justifyContent: 'center',
  alingItems: 'center',
  padding: 30,
};

const sectionsBorders = {
  width: '100%',
  display: 'flex',
};

const sectionBorder = {
  borderBottom: '1px solid rgb(238,238,238)',
  width: '249px',
};

const sectionCenter = {
  borderBottom: '1px solid rgb(145,71,255)',
  width: '102px',
};

const link = {
  textDecoration: 'underline',
};
