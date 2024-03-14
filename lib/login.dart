import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:ledgerapp/Home.dart';
import 'package:ledgerapp/signup.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';


void main() {
  runApp(FlutterApp());
}

class FlutterApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.orange),
      home: Loginpage(),
    );
  }
}

class Loginpage extends StatefulWidget {
  @override
  State<Loginpage> createState() => _LoginpageState();
}

class _LoginpageState extends State<Loginpage> {


  bool passwordObscured = true;

  // Elements body (login form)//
 

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        title: Text(
          "Login",
          style: TextStyle(color: Colors.white),
        ),
        automaticallyImplyLeading: false,
        elevation: 10,
        backgroundColor: Color.fromARGB(255, 201, 14, 0),
      ),

      //BODY//

      //Company Logo//
      body: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Container(
          color: Colors.white, //LOGIN BOX //

          child: Center(
            child: Padding(
              padding: EdgeInsets.only(top: 10),
              child: Column(
                children: [
                  Row(
                    children: [
                      //commedia logo section//
                      Padding(
                        padding: EdgeInsets.only(top: 10, bottom: 0, left: 30),
                        child: SizedBox(
                          width: 240,
                          height: 120,
                          // child: Image.asset('assets/Images/applogo.png',
                          //     fit: BoxFit.cover),
                          // child: Text(
                          //   "Annapurna",
                          //   style: TextStyle(
                          //       fontSize: 40,
                          //       color: Colors.red,
                          //       fontWeight: FontWeight.bold),
                          // ),
                        ),
                      ),
                    ],
                  ),

                  //Login Form//
                  Container(
                    margin: EdgeInsets.only(top: 3),
                    width: 380,
                    height: 450,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(40),
                        border: Border.all(
                          width: 3,
                          color: Colors.black,
                        ),
                        color: Color(0xffF4F2F2),
                        boxShadow: [
                          BoxShadow(
                            blurRadius: 12,
                            spreadRadius: 0,
                            color: Colors.grey,
                          )
                        ]),

                    //content inside Login box//

                    //LOGIN Heading//
                    child: Column(children: [
                      Container(
                        margin: EdgeInsets.only(top: 16, left: 40, right: 40),
                        child: const Text(
                          "Login",
                          style: TextStyle(
                              fontSize: 40,
                              fontWeight: FontWeight.bold,
                              color: Color(0xffff7400)),
                        ),
                      ),

                      //USERNAME Textfield //

                      Padding(
                        padding: EdgeInsets.only(left: 20, right: 20, top: 20),
                        child: Container(
                          height: 60,
                          child: TextField(
                            
                            decoration: InputDecoration(
                              prefixIcon: Icon(Icons.person),
                              hintText: "Email",
                              focusedBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(30),
                                borderSide: BorderSide(
                                    color: Color(0xff5499C7), width: 2),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(30),
                                borderSide:
                                    BorderSide(color: Colors.black, width: 2),
                              ),
                            ),
                          ),
                        ),
                      ),

                      //PASSWORD Textfeild//
                      Padding(
                        padding: EdgeInsets.only(left: 20, right: 20, top: 30),
                        child: Container(
                          height: 60,
                          child: TextField(
                            
                            obscureText: passwordObscured,
                            obscuringCharacter: '*',
                            decoration: InputDecoration(
                              prefixIcon: Icon(Icons.lock),
                              hintText: "Password",
                              suffixIcon: IconButton(
                                  onPressed: () {
                                    setState(() {
                                      passwordObscured = !passwordObscured;
                                    });
                                  },
                                  icon: Icon(
                                    passwordObscured
                                        ? Icons.visibility_off
                                        : Icons.visibility,
                                  )),
                              focusedBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(30),
                                borderSide: BorderSide(
                                    color: Color(0xff5499C7), width: 2),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(30),
                                borderSide:
                                    BorderSide(color: Colors.black, width: 2),
                              ),
                            ),
                          ),
                        ),
                      ),

                      //Forgot password//
                      Padding(
                        padding: EdgeInsets.only(left: 170),
                        child: Container(
                            child: InkWell(
                          onTap: () {
                            showDialog(
                              context: context,
                              builder: (BuildContext context) {
                                return AlertDialog(
                                  // title: Text('Sorry'),
                                  content:
                                      Text('This feature is not available '),
                                  actions: <Widget>[
                                    TextButton(
                                      onPressed: () {
                                        Navigator.of(context).pop();
                                      },
                                      child: Text('OK'),
                                    ),
                                  ],
                                );
                              },
                            );
                          },
                          child: const Text(
                            "Forgot password ?",
                            style: TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.bold,
                              color: Color(0xffff7400),
                            ),
                          ),
                        )),
                      ),

                      //Login button//
                      Padding(
                        padding: EdgeInsets.only(top: 30, left: 20, right: 20),
                        child: SizedBox(
                          width: 300,
                          height: 60,
                          child: ElevatedButton(
                            onPressed: () {
                              // Navigator.push(
                              //     context,
                              //     MaterialPageRoute(
                              //         builder: (context) => HomeScreen()));
                              
                            },
                            style: ButtonStyle(
                                backgroundColor: MaterialStateProperty.all(
                              Color.fromARGB(255, 201, 14, 0),
                            )),
                            child: Text(
                              "Login",
                              style:
                                  TextStyle(fontSize: 20, color: Colors.white),
                            ),
                          ),
                        ),
                      ),

                     

                      //SHORTCUT TO REGISTER//
                      Padding(
                        padding: EdgeInsets.only(top: 2, left: 101),
                        child: Container(
                          child: Row(
                            children: [
                              Text(
                                "Not Registered?",
                                style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xffff7400),
                                ),
                              ),

                              //REGISTER SHORTCUT BUTTON//
                              Padding(
                                padding: EdgeInsets.only(left: 10),
                                child: Container(
                                  child: ElevatedButton(
                                    onPressed: () {
                                      Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) =>
                                                  SignupScreen()));
                                    },
                                    style: ButtonStyle(
                                        backgroundColor: MaterialStateProperty.all(
                                            // Color(0xffff7400),
                                            Color.fromARGB(255, 201, 14, 0)
                                            // Color.fromARGB(255, 35, 116, 215),
                                            )),
                                    child: Text(
                                      'SignUp',
                                      style: TextStyle(
                                          fontSize: 15, color: Colors.white),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ]),
                  ),

                  //column for logo and container//
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
