import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const style = {
	table: {
		borderCollapse: 'collapse',
	},
	tableCell: {
		border: '1px solid gray',
		margin: 0,
		padding: '5px 10px',
		width: 'max-content',
		minWidth: '120px',
		fontFamily: 'arial, sans-serif',
	},
	form: {
		container: {
			padding: '20px',
			border: '1px solid #F0F8FF',
			borderRadius: '15px',
			width: 'max-content',
			marginBottom: '40px',
			fontFamily: 'arial, sans-serif',
		},
		inputs: {
			marginBottom: '5px',
			padding: '5px 10px',
			border: '0.5px solid #ccc',
			borderRadius: '5px',
		},
		submitBtn: {
			marginTop: '10px',
			padding: '10px 15px',
			border: 'none',
			backgroundColor: 'lightseagreen',
			color: 'white',
			fontSize: '14px',
			fontWeight: 'bold',
			borderRadius: '5px',
			cursor: 'pointer',
		},
	},
};

function PhoneBookForm(props) {
	const defaultContact = {
		id: Date.now(),
		userFirstname: 'Coder',
		userLastname: 'Byte',
		userPhone: '8885559999',
	};

	const [userState, setUserState] = useState(defaultContact);

	const handleUserChange = e => {
		setUserState({
			...userState,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = e => {
		e.preventDefault();
		if (!userState.userFirstname || !userState.userLastname || !userState.userPhone)
			return;
		props.addUser(userState);
		setUserState({
			id: userState.id + 1,
			userFirstname: '',
			userLastname: '',
			userPhone: '',
		});
	};
	const changeBackground = e => (e.target.style.backgroundColor = 'darkseagreen');
	const sameBackground = e => (e.target.style.backgroundColor = 'lightseagreen');

	return (
		<form onSubmit={handleSubmit} style={style.form.container}>
			<label>First name:</label>
			<br />
			<input
				style={style.form.inputs}
				className='userFirstname'
				name='userFirstname'
				type='text'
				value={userState.userFirstname}
				onChange={handleUserChange}
			/>
			<br />
			<label>Last name:</label>
			<br />
			<input
				style={style.form.inputs}
				className='userLastname'
				name='userLastname'
				type='text'
				value={userState.userLastname}
				onChange={handleUserChange}
			/>
			<br />
			<label>Phone:</label>
			<br />
			<input
				style={style.form.inputs}
				className='userPhone'
				name='userPhone'
				type='text'
				value={userState.userPhone}
				onChange={handleUserChange}
			/>
			<br />
			<input
				style={style.form.submitBtn}
				className='submitButton'
				type='submit'
				value='Add User'
				onMouseOver={changeBackground}
				onMouseLeave={sameBackground}
			/>
		</form>
	);
}

function InformationTable(props) {
	const sortedContacts = props.users.sort((x, y) =>
		x.userLastname.localeCompare(y.userLastname)
	);

	const displayContact =
		sortedContacts.length > 0 ? (
			sortedContacts.map(user => (
				<tr key={user.id}>
					<td style={style.tableCell}>{user.userFirstname}</td>
					<td style={style.tableCell}>{user.userLastname}</td>
					<td style={style.tableCell}>{user.userPhone}</td>
				</tr>
			))
		) : (
			<tr>
				<td colSpan={3}></td>
			</tr>
		);

	return (
		<table style={style.table} className='informationTable'>
			<thead>
				<tr>
					<th style={style.tableCell}>First name</th>
					<th style={style.tableCell}>Last name</th>
					<th style={style.tableCell}>Phone</th>
				</tr>
			</thead>
			<tbody>{displayContact}</tbody>
		</table>
	);
}

function Application(props) {
	const usersObject = [];
	const [users, setUsers] = useState(usersObject);

	const addUser = user => {
		setUsers([...users, user]);
	};

	return (
		<section>
			<PhoneBookForm addUser={addUser} />
			<InformationTable users={users} />
		</section>
	);
}

ReactDOM.render(<Application />, document.getElementById('root'));
