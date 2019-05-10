import React from 'react'
import axios from 'axios'

export default class Fib extends React.Component
{
	state = {
		index: '',
		values: {},
		seenIndexes: []
	}

	componentDidMount() {
		this.fetchSeenIndexes()
		this.fetchValues()
	}

	async fetchSeenIndexes() {
		await axios.get('/api/values/all').then(res => {
			this.setState({
				seenIndexes: res.data
			})
		})
	}

	async fetchValues() {
		await axios.get('/api/values/current').then(res => {
			this.setState({
				values: res.data
			})
		})
	}

	renderSeenIndexes() {
		return this.state.seenIndexes.map( ({number}) => number).join(', ')
	}

	renderValues() {
		const values = this.state.values
		const entries = []

		for(let key in values) {
			entries.push(
				<div key={key}>
					For index {key} I calculated {values[key]}
				</div>
			)
		}

		return entries
	}

	handleSubmit = async (event) => {
		event.preventDefault()

		await axios.post('/api/values', {
			index: this.state.index
		})

		this.setState({ index: '' })
		this.form.elements['index'].value = ''
		this.form.elements['index'].focus()
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit} ref={form => this.form=form}>
					<label htmlFor="index">Enter Index: </label>
					<input id="index" name="index" type="text" onChange={event => this.setState({index: event.target.value})} />
					<input type="submit" />
				</form>

				<h1>Seen Indexes:</h1>
				{this.renderSeenIndexes()}

				<h1>Calculated Values:</h1>
				{this.renderValues()}
			</div>
		)
	}
}