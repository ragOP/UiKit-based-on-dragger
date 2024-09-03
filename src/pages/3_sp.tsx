import React, {useState, useEffect} from 'react';
//@ts-ignore
import TagManager from 'react-gtm-module'
import axios from "axios";
import './styles.scss'

import { scrollTo } from '../utils';

import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Head_bg from '../assets/latest.jpg'


const tagManagerArgs = {
    gtmId: 'GTM-54RD4XN'
}

TagManager.initialize(tagManagerArgs)

export default function Third_SP() {

	


	const [quiz, setQuiz] = useState("¿Tienes más de 64 años?")
	const [step, setStep] = useState("process")
	const [min, setMin] = useState(3)
	const [second, setSecond] = useState<any>(0)    
	const [yes, setYes] = useState("Sí, tengo 65 años o más")
	const [no, setNo] = useState("No, tengo 64 años o menos")
	
	
	const stepProcess = () => {
		if(step==="Revisando sus respuestas..."){
			setTimeout(() => {
			  setStep("Coincidencia con las mejores opciones...")
			  }, 1500);
			}
		  if(step==="Coincidencia con las mejores opciones..."){
			setTimeout(() => {
			  setStep("Confirmación de elegibilidad...")
			  }, 1500);
			}
		  if(step==="Confirmación de elegibilidad..."){
			setTimeout(() => {
			  setStep("completed")

			  axios
				.get(process.env.REACT_APP_PROXY + `/visits/7`)
				.then(({ data }) => {
					const _id = data[0]._id
					const _visits = data[0].visits
					const _views = data[0].views
					const _calls = data[0].calls
					const _positives = data[0].positives
					const _negatives = data[0].negatives
					const visits = {
						visits: _visits,
						views: _views+1,
						calls: _calls,
						positives: _positives,
						negatives: _negatives,
					}
				axios
				.put(
					process.env.REACT_APP_PROXY + `/visits/update-visits7/`+_id,
					visits
				)
				.catch((err) =>
					console.log(err)
				);
			})
			  }, 1500);
			}
	  
		  if(step==="completed"){
			const startTime:any = new Date();
			const timer = setInterval(()=> {
			  const nowTime:any = new Date();
			  setSecond((180-Math.round((nowTime-startTime)/1000))%60)
			  setMin(Math.floor((180-Math.round((nowTime-startTime)/1000))/60))
			}, 1000)
		}
	}
// 	const messages = [
// 		"Juan M. García de San Juan, PR acaba de calificar para la Tarjeta Flex de $3,600.",
// 		"María S. Martínez de Albuquerque, NM acaba de calificar para la Tarjeta Flex de $3,600.",
// 		"Carlos R. López de El Paso, TX acaba de calificar para la Tarjeta Flex de $3,600.",
// 		"Ana C. Ramírez de Miami, FL acaba de calificar para la Tarjeta Flex de $3,600.",
// 		"Javier F. González de Los Angeles, CA acaba de calificar para la Tarjeta Flex de $3,600."
// ];

// Function to shuffle array in place
// const shuffleArray = (array:any) => {
// 		for (let i = array.length - 1; i > 0; i--) {
// 				const j = Math.floor(Math.random() * (i + 1));
// 				[array[i], array[j]] = [array[j], array[i]];
// 		}
// };

// shuffleArray(messages);

// const notify = (message:any) => {
// 		// Dismiss all existing toasts
// 		toast.dismiss();
// 		let boldedMessage = message;


// 		// Make the word "Allowance" bold in all lines
// 		boldedMessage = boldedMessage.replace(
// 				/\$3,600./g,
// 				'<strong class="green-bold">$3,600.</strong>'
// 		);

// 		// Make specific dollar amounts bold only in specific lines
// 		const specialAmounts = ["$16,800", "$16,800", "$16,800", "$16,800"];
// 		specialAmounts.forEach((amount) => {
// 				if (message.includes(amount)) {
// 						boldedMessage = boldedMessage.replace(
// 								amount,
// 								`<strong class="green-bold">${amount}</strong>`
// 						);
// 				}
// 		});

		// Show new toast
// 		toast(<div dangerouslySetInnerHTML={{ __html: boldedMessage }} />, {
// 				position: "bottom-right",
// 				autoClose: 5000,
// 				hideProgressBar: true,
// 				closeOnClick: false,
// 				pauseOnHover: true,
// 				draggable: true,
// 				closeButton: false,
// 		});
// };

// useEffect(() => {
// 		const delayedEffect = setTimeout(() => {
// 				// Create a function to handle the logic
// 				const showRandomToast = () => {
// 						const randomTime = 6000;
// 						const randomMessage =
// 								messages[Math.floor(Math.random() * messages.length)];
// 						// notify(randomMessage);
// 						return randomTime;
// 				};
				
// 				// Show the first toast
// 				let nextTime = showRandomToast();

// 				// Set up a recurring timer
// 				const timer = setInterval(() => {
// 						nextTime = showRandomToast();
// 				}, nextTime);

// 				// Cleanup
// 				return () => {
// 						clearInterval(timer);
// 				};
// 		}, 6000); // 6-second delay before the useEffect code runs

// 		// Cleanup for the setTimeout
// 		return () => {
// 				clearTimeout(delayedEffect);
// 		};
// }, []);


	useEffect(() => {
		stepProcess()
	}, [step])

	const topScroll = (id: any) => {
		scrollTo({ id });
	}

	const handleQuizP = () => {
		topScroll("btn");
		if(quiz === "¿Tienes más de 64 años?"){
			setQuiz("¿Tiene Medicaid o Medicare?")
			setYes("Sí")
			setNo("No")
		}else{
			setStep("Revisando sus respuestas...")
			topScroll("top");
		}

		axios
		.get(process.env.REACT_APP_PROXY + `/visits/7`)
		.then(({ data }) => {
			const _id = data[0]._id
			const _visits = data[0].visits
			const _views = data[0].views
			const _calls = data[0].calls
			const _positives = data[0].positives
			const _negatives = data[0].negatives
			const visits = {
				visits: _visits,
				views: _views,
				calls: _calls,
				positives: _positives+1,
				negatives: _negatives,
			}
		axios
		.put(
			process.env.REACT_APP_PROXY + `/visits/update-visits7/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}

	const handleQuizN = () => {
		topScroll("btn");
		if(quiz === "¿Tienes más de 64 años?"){
			setQuiz("¿Tiene Medicaid o Medicare?")
			setYes("Sí")
			setNo("No")
		}else{
			setStep("Revisando sus respuestas...")
			topScroll("top");
		}

		axios
		.get(process.env.REACT_APP_PROXY + `/visits/7`)
		.then(({ data }) => {
			const _id = data[0]._id
			const _visits = data[0].visits
			const _views = data[0].views
			const _calls = data[0].calls
			const _positives = data[0].positives
			const _negatives = data[0].negatives
			const visits = {
				visits: _visits,
				views: _views,
				calls: _calls,
				positives: _positives,
				negatives: _negatives+1,
			}
		axios
		.put(
			process.env.REACT_APP_PROXY + `/visits/update-visits7/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}

    return(
        <div>
{/* 									<ToastContainer /> */}
			<div className='top-sticky-blue' id='top'>My Senior Saving Journal</div>
			{step==="process"?
				<>
				<div className='main-container-5'>
					<div className='main-descrition-5'>
						<div className='main-des-title'>2Los estadounidenses mayores de 64 años ahora pueden calificar para la tarjeta FLEX de $3600 en 2024. ¡Así es como!</div>
						<img className='topic-img-5' src = {Head_bg} alt = "head"/>
						<div className='main-des-5'>Los estadounidenses mayores de 64 años pueden precalificar para la tarjeta Flex Spending Card 2024 que les otorga hasta $3600. Las personas mayores pueden usar los fondos para servicios dentales o de la vista, comestibles, alquiler, facturas de servicios públicos, medicamentos y más.</div>
						<div className='main-des-5' style = {{marginTop:"1rem"}}><b>La oportunidad de actualizar sus beneficios finaliza el 31 de marzo</b> por lo tanto, es mejor llamar y bloquear su Tarjeta Flex mientras aún esté disponible.</div>
					</div>
					<div className='survey'>
					<div className='quiz-5' id='btn'>{quiz}</div>
					<div className='answer'>
						<div className='answer-btn-5' onClick={handleQuizP}>{yes}</div>
						<div className='answer-btn-5' onClick={handleQuizN}>{no}</div>
					</div>
					</div>
				</div>
				</>:
				(
				step!=="process" && step!=="completed"?
					<div className='checking' style={{fontWeight:"700"}}>
					{step}
					</div>:
					<div className='checking'>
						<div className='congrats'>¡Felicitaciones, usted califica!</div>
						<div className='top-description-5'>¡Haga Una <b>Llamada Rápida</b> Para Reclamar Su Tarjeta Flex!</div>
						<div className='spots-count'>Lugares restantes: 4</div>
						<div className='tap-direction-span'>👇 TOCA ABAJO PARA LLAMAR 👇</div>
						<a href = "tel:+18666570134">
							<div className='call-btn' >
								CALL (866) 657-0134
							</div>
						</a>
						<div className='sub-title-span'>Nosotras Hemos Reservado Tu Lugar</div>
						<div className='sub-description'>Debido al alto volumen de llamadas, su agente oficial está esperando solo <b> 3 minutos </b>, luego su lugar no estará reservado.</div>
						<div className='timer'>
							<div className='timer-cell'>{min}</div>
							<div className='timer-cell'>:</div>
							<div className='timer-cell'>{second}</div>
						</div>
					</div>
				)
			}
			<div className='footer'>
				<div className='terms'>Terms & Conditions | Privacy Policy</div>
				<div className='copyright'>Copyright © 2022 - All right reserved Daily America Savings.</div>
			</div>
{/* 			<ToastContainer
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
		</div>
    )
} 
