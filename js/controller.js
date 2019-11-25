;(function () {
	'use strict'

	let montedElement = null

	const api = {}

	model.dispatch = function dispatch () {
		api.update()
	}

	view.clickHandler = function clickHandler (element, event) {
		const plateNumber = model.getCurrentPlateNumber()
		const plateData = model.getPlateData(plateNumber)

		

		if (plateNumber === 1) {
			event.preventDefault()
			if (element.textContent === 'Take the test') {
				
				model.toNextPlate()
			}
		}

		else if (plateNumber === 2) {
			if (element.tagName === 'INPUT') {

				
				model.setPlateData(plateNumber, {
					item: element.value
				})				
			}

			else if (element.tagName === 'A' && element.textContent === 'Back') {
				
				model.toPrevPlate()
			}

			else if (element.tagName === 'A' && element.textContent === 'Further') {
				if (plateData.item) {
					
					model.toNextPlate()
				}

				else {
					alert('Choose an answer option')
				}
			}
		}

		else if (plateNumber === 3) {
			event.preventDefault()
			if (element.tagName === 'INPUT') {
				
				const value = element.value

				if (plateData.items.includes(value)) {
					const index = plateData.items.indexOf(value)
					plateData.items.splice(index, 1)
				}

				else {
					plateData.items.push(value)
				}

				model.setPlateData(plateNumber, plateData)

				console.log(plateData.items)
			}

			else if (element.tagName === 'A' && element.textContent === 'Back') {
				model.toPrevPlate()
			}

			else if (element.tagName === 'A' && element.textContent === 'Further') {
				if (plateData.items.length) {
					model.toNextPlate()
				}

				else {
					alert('Choose an answer option')
				}
			}

		}

		 else if (plateNumber === 4) {
			event.preventDefault()
			if(element.tagName === 'INPUT') {

				console.log(element.value)
				model.setPlateData(plateNumber,{

					item: element.value
				})
			}
			 else if (element.tagName === 'A' && element.textContent === 'Back') {
				model.toPrevPlate()
			}
			 else if (element.tagName === 'A' && element.textContent === 'Further') {
				if (plateData.item) {
					model.toNextPlate()
				}

				else {
					alert('Choose an answer option')
				}
			}


		}
		 else if (plateNumber === 5) {
			const emailElement = document.querySelector('#email')
			
			const checkBoxElement = document.querySelector('#confirmBox')
			
			
			 if (element.id === 'getResults' && checkBoxElement.checked && emailElement.value !== '') {
				 
				plateData.email = emailElement.value
				plateData.agreement = checkBoxElement.checked
				
				model.setPlateData(plateNumber, plateData)
				
				  model.toNextPlate()
				 
				
			 }
	
		}	
		 else if ( plateNumber === 6) {
			 
			// const bonusCard1 = document.querySelector('#bonus-card1')
			// const bonusCard2 = document.querySelector('#bonus-card2')

			 event.preventDefault()
			if (element.id === 'bonus-card1') {
				console.log(element)
				location = 'https://www.youtube.com/watch?v=PK3u5mdA_g0'
			}
			 else if (element.id === 'bonus-card2') {
				console.log(element)
				location = 'https://www.youtube.com/watch?v=M9DlUe08hZE'
			}
		}
	}

	api.start = function start (initMontedElement) {
		montedElement = initMontedElement
		api.update()
	}

	api.update = function update () {
		const plateNumber = model.getCurrentPlateNumber()
		const plateData = model.getPlateData(plateNumber)
		const plateElement = view.getPlate(plateNumber, plateData)

		montedElement.innerHTML = ''
		montedElement.append(plateElement)
	}

	window.controller = api
})();