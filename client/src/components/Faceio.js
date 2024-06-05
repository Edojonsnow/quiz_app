// import { useEffect } from 'react'
// import '../styles/face.css'

// function FaceIO(){

//   let faceio;
//   useEffect(() => {
//      faceio = new faceIO("fioafa04");
//   }, []);

//   const handleLogIn = async () => {
//     try {
//       let response = await faceio.authenticate({
//         locale: "auto",
//       });

//       window.location.href = "./dashboard"

//       console.log(` Unique Facial ID: ${response.facialId}
//           PayLoad: ${response.payload}
//           `);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <section id='face'>
//       <h1>Face Authentication by FaceIO</h1>

//       <button className='back-to-dashboard' onClick={handleLogIn}>LOG INTO YOUR ACCOUNT WITH BIOMETRICS</button>
//     </section>
//     </>
//   )
// }

// export default FaceIO
