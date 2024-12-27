const oldObject = {
	name: 'ahmed',
	lastName: 'ashraf',
	address: 'alkajsdlkfj',
}

console.log(oldObject)

const newObject = {
	...oldObject,
	address: 'secret',
}

console.log(newObject)

const oldArray = ['APple', 'Oranges', 'My fao']

console.log(oldArray)

const newArray = [...oldArray, 'My fao']

console.log(newArray)

const rest = (...args) => {
	console.log(args)
}
console.log(rest(2, 55, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5))

const [num1, , num2] = [1, 2, 5798789]

console.log(num2)

let person = 'ahmed'

const anotherPerson = person

person = 'aslakjsdflkjalkdsfjlkajdsflkjad'

console.log(anotherPerson)

const objec = {
	name: 'zoo',
}

const anotherObjec = {
	...objec,
}
console.log(anotherObjec)

objec.name = 'elephant'

console.log(anotherObjec)
