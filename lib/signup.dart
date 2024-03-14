import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:ledgerapp/login.dart';
import 'package:firebase_core/firebase_core.dart';

void main() {
  runApp(FlutterApp());
}

class FlutterApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "FlutterApp",
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.orange),
      home: SignupScreen(),
    );
  }
}

class SignupScreen extends StatefulWidget {
  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  bool passwordObscured = true;

  ////BODY//
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
          title: Text(
            "Signup",
            style: TextStyle(color: Colors.white),
          ),
          automaticallyImplyLeading: false,
          elevation: 10,
          backgroundColor: Color.fromARGB(255, 201, 14, 0)),

      //BACKGROUND IMAGE//
      body: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Container(
          color: Colors.white,

          //Company Logo //
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
                          // child: Image.asset('assets/Images/commedianew.png',
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

                  //SIGNUP CONTAINER//

                  Container(
                    margin: EdgeInsets.only(top: 17),
                    width: 380,
                    height: 480,
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

                    //content inside Signup box//

                    //SIGNUP Heading//
                    child: Column(children: [
                      Container(
                        margin: EdgeInsets.only(top: 16, left: 40, right: 40),
                        child: Text(
                          "Signup",
                          style: TextStyle(
                              fontSize: 40,
                              fontWeight: FontWeight.bold,
                              color: Color(0xffff7400)),
                        ),
                      ),

                      //EMAIL FIELD//
                      Padding(
                        padding: EdgeInsets.only(left: 20, right: 20, top: 20),
                        child: Container(
                          height: 60,
                          child: TextField(
                            // controller: _emailController,
                            decoration: InputDecoration(
                              prefixIcon: Icon(Icons.email),
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

                      //USERNAME FIELD//

                      Padding(
                        padding: EdgeInsets.only(left: 20, right: 20, top: 20),
                        child: Container(
                          height: 60,
                          child: TextField(
                            // controller: _usernameController,
                            decoration: InputDecoration(
                              prefixIcon: Icon(Icons.person_pin_circle),
                              hintText: "Username",
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

                      //PASSWORD FIELD//

                      Padding(
                        padding: EdgeInsets.only(left: 20, right: 20, top: 20),
                        child: Container(
                          height: 60,
                          child: TextField(
                            // controller: _passwordController,
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

                      //SIGNUP BUTTON//

                      Padding(
                        padding: EdgeInsets.only(top: 20, left: 20, right: 20),
                        child: SizedBox(
                          width: 300,
                          height: 60,
                          child: ElevatedButton(
                            onPressed: () {},
                            style: ButtonStyle(
                                backgroundColor: MaterialStateProperty.all(
                                    Color.fromARGB(255, 201, 14, 0))),
                            child: Text(
                              "SignUp",
                              style:
                                  TextStyle(fontSize: 20, color: Colors.white),
                            ),
                          ),
                        ),
                      ),

                      //SHORTCUT TO LOGIN//
                      Padding(
                        padding: EdgeInsets.only(top: 2, left: 90),
                        child: Container(
                          child: Row(
                            children: [
                              Text(
                                "Already Registered?",
                                style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xffff7400),
                                ),
                              ),

                              //LOGIN SHORTCUT BUTTON//
                              Padding(
                                padding: EdgeInsets.only(left: 5),
                                child: Container(
                                  child: ElevatedButton(
                                    onPressed: () {
                                      Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) =>
                                                  Loginpage()));
                                    },
                                    style: ButtonStyle(
                                        backgroundColor:
                                            MaterialStateProperty.all(
                                                Color.fromARGB(
                                                    255, 201, 14, 0))),
                                    child: Padding(
                                      padding: EdgeInsets.only(bottom: 3),
                                      child: Text(
                                        'Login',
                                        style: TextStyle(
                                            fontSize: 15, color: Colors.white),
                                      ),
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

                  //Column between logo and signup page//
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
