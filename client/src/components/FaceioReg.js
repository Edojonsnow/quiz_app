// import { useEffect } from "react";
// import "../styles/face.css";

// function FaceIOReg() {
//   let faceio = null;

//   useEffect(() => {
//     faceio = new faceIO("fioafa04");
//   }, []);

//   const handleSignIn = async () => {
//     // try {
//     //   let response = await faceio.enroll({
//     //     locale: "auto",
//     //     payload: {
//     //       email: "example@gmail.com",
//     //       pin: "12345",
//     //     },
//     //   });

//     //   console.log(` Unique Facial ID: ${response.facialId}
//     //   Enrollment Date: ${response.timestamp}
//     //   Gender: ${response.details.gender}
//     //   Age Approximation: ${response.details.age}`);
//     //   window.location.href = "./login"
//     // } catch (error) {
//     //   console.log(error);
//     // }

//     faceio
//       .enroll({
//         locale: "auto", // Default user locale
//         payload: {
//           /* The payload we want to associate with this particular user which is forwarded back to us upon future authentication of this user.*/
//           whoami: 123456, // Dummy ID linked to this particular user
//           email: "john.doe@example.com",
//         },
//       })
//       .then((userInfo) => {
//         // User Successfully Enrolled!
//         alert(`User Successfully Enrolled!:`);

//         window.location.href = "./dashboard";
//         console.log(userInfo);
//         // handle success, save the facial ID (userInfo.facialId), redirect to the dashboard...
//       })
//       .catch((errCode) => {
//         // Something went wrong during enrollment, log the failure
//         console.log(errCode);
//       });
//   };

//   return (
//     <>
//       <section id="face">
//         <h1>Face Authentication by FaceIO</h1>
//         <button onClick={handleSignIn}>REGISTER ACCOUNT WITH BIOMETRICS</button>
//       </section>
//     </>
//   );
// }

// export default FaceIOReg;
