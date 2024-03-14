import 'package:flutter/material.dart';
import 'package:ledgerapp/Home.dart';
// import 'package:flutter_application_commedia/Login.dart';
// import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:ledgerapp/login.dart';

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
      home: CategoryScreen(),
    );
  }
}

class CategoryScreen extends StatefulWidget {
  @override
  State<CategoryScreen> createState() => _CategoryScreenState();
}

class _CategoryScreenState extends State<CategoryScreen> {
  ////BODY//
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
          title: Text(
            "Category",
            style: TextStyle(color: Colors.white),
          ),
          automaticallyImplyLeading: false,
          elevation: 10,
          backgroundColor: Color.fromARGB(255, 201, 14, 0)),
      body: Container(
        color: Colors.white,

        //Header//

        //Company Logo//
        child: Column(
          children: [
            Row(
              children: [
                //commedia logo section//
                Padding(
                  padding: EdgeInsets.only(top: 30, bottom: 0, left: 20),
                  child: SizedBox(
                    width: 230,
                    height: 60,
                    child: InkWell(
                      child: Image.asset('assets/Images/annapurnanew.png',
                          fit: BoxFit.fill),
                      onTap: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => HomeScreen()));
                      },
                    ),
                  ),
                ),

                SizedBox(
                  width: 20,
                ),

                //Log-Out Button//
                Padding(
                  padding: EdgeInsets.only(top: 30, bottom: 0, left: 70),
                  child: InkWell(
                    onTap: () async {
                      Navigator.push(context,
                          MaterialPageRoute(builder: (context) => Loginpage()));
                    },
                    child: SizedBox(
                      width: 50,
                      height: 50,
                      child: CircleAvatar(
                          backgroundColor: Color.fromARGB(255, 201, 14, 0),
                          child: Image.asset('assets/Images/womenicon.png')),
                    ),
                  ),
                ),
              ],
            ),

            //Category//
            SizedBox(
              height: 230,
            ),
            //

            Center(
              child: SizedBox(
                width: 160,
                height: 40,
                child: ElevatedButton(
                    onPressed: () {},
                    style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all(
                            Color.fromARGB(255, 201, 14, 0))),
                    child: Text(
                      "Dinner",
                      style: TextStyle(
                          fontSize: 24,
                          color: Colors.white,
                          fontWeight: FontWeight.w600),
                    )),
              ),
            ),

            SizedBox(
              height: 20,
            ),

            //

            SizedBox(
              width: 160,
              height: 40,
              child: ElevatedButton(
                  onPressed: () {},
                  style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all(
                          Color.fromARGB(255, 201, 14, 0))),
                  child: Text(
                    "Breakfast",
                    style: TextStyle(
                        fontSize: 24,
                        color: Colors.white,
                        fontWeight: FontWeight.w600),
                  )),
            ),
          ],
        ),
      ),
    );
  }
}
