import React from 'react'
import {Link} from 'react-router-dom'

export default class OtherPage extends React.Component
{
	render() {
		return (
			<div>
				This is OtherPage
				<Link to="/">Go To Home</Link>
			</div>
		)
	}
}