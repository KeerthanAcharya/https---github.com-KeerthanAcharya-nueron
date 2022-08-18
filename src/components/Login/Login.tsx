import React from "react";
import { Row, Col, Container } from "react-bootstrap";

import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

import "./Login.css";

const Login = ({ setUser }: { setUser: Function }) => {
	return (
		<Container fluid>
			<Row className='rowContainer'>
				<Col className='leftside'>
					<LeftPanel />
				</Col>
				<Col className='rightside'>
					<RightPanel setUser={setUser} />
				</Col>
			</Row>
		</Container>
	);
};

export default Login;
