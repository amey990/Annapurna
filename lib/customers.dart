import 'package:flutter/material.dart';
import 'package:ledgerapp/Home.dart';
import 'package:ledgerapp/category.dart';
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
      home: CustomersScreen(),
    );
  }
}

class CustomersScreen extends StatefulWidget {
  @override
  State<CustomersScreen> createState() => _CustomersScreenState();
}

class _CustomersScreenState extends State<CustomersScreen> {
  ////BODY//
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
          title: Text(
            "Customer",
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
            SizedBox(
              height: 50,
            ),
            Container(
              width: 380,
              height: 130,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                      width: 2, color: Color.fromARGB(255, 201, 14, 0))),
              child: Column(
                children: [
                  Padding(
                    padding: EdgeInsets.only(right: 220, top: 10),
                    child: Text(
                      "Amey muley",
                      style: TextStyle(
                          fontSize: 20,
                          color: Color(0xffff7400),
                          fontWeight: FontWeight.w600),
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Row(
                    children: [
                      SizedBox(
                        width: 175,
                      ),

                      SizedBox(
                        width: 80,
                        child: ElevatedButton(
                            onPressed: () {},
                            style: ButtonStyle(
                                backgroundColor: MaterialStateProperty.all(
                              Color.fromARGB(255, 201, 14, 0),
                            )),
                            child: Text(
                              "Bill",
                              style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.w500,
                                  color: Colors.white),
                            )),
                      ),

                      //
                      SizedBox(
                        width: 10,
                      ),

                      //

                      SizedBox(
                        width: 100,
                        child: ElevatedButton(
                            onPressed: () {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => CategoryScreen()));
                            },
                            style: ButtonStyle(
                                backgroundColor: MaterialStateProperty.all(
                              Color.fromARGB(255, 201, 14, 0),
                            )),
                            child: Text(
                              "Update",
                              style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.w500,
                                  color: Colors.white),
                            )),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            SizedBox(
              height: 10,
            ),

            //second

            Container(
              width: 380,
              height: 130,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                      width: 2, color: Color.fromARGB(255, 201, 14, 0))),
              child: Column(
                children: [
                  Padding(
                    padding: EdgeInsets.only(right: 220, top: 10),
                    child: Text(
                      "Amey muley",
                      style: TextStyle(
                          fontSize: 20,
                          color: Color(0xffff7400),
                          fontWeight: FontWeight.w600),
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Row(
                    children: [
                      SizedBox(
                        width: 175,
                      ),

                      SizedBox(
                        width: 80,
                        child: ElevatedButton(
                            onPressed: () {},
                            style: ButtonStyle(
                                backgroundColor: MaterialStateProperty.all(
                              Color.fromARGB(255, 201, 14, 0),
                            )),
                            child: Text(
                              "Bill",
                              style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.w500,
                                  color: Colors.white),
                            )),
                      ),

                      //
                      SizedBox(
                        width: 10,
                      ),

                      //

                      SizedBox(
                        width: 100,
                        child: ElevatedButton(
                            onPressed: () {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => CategoryScreen()));
                            },
                            style: ButtonStyle(
                                backgroundColor: MaterialStateProperty.all(
                              Color.fromARGB(255, 201, 14, 0),
                            )),
                            child: Text(
                              "Update",
                              style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.w500,
                                  color: Colors.white),
                            )),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            SizedBox(
              height: 10,
            ),

            //Third

            Container(
              width: 380,
              height: 130,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                      width: 2, color: Color.fromARGB(255, 201, 14, 0))),
              child: Column(
                children: [
                  Padding(
                    padding: EdgeInsets.only(right: 220, top: 10),
                    child: Text(
                      "Amey muley",
                      style: TextStyle(
                          fontSize: 20,
                          color: Color(0xffff7400),
                          fontWeight: FontWeight.w600),
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Row(
                    children: [
                      SizedBox(
                        width: 175,
                      ),

                      SizedBox(
                        width: 80,
                        child: ElevatedButton(
                            onPressed: () {},
                            style: ButtonStyle(
                                backgroundColor: MaterialStateProperty.all(
                              Color.fromARGB(255, 201, 14, 0),
                            )),
                            child: Text(
                              "Bill",
                              style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.w500,
                                  color: Colors.white),
                            )),
                      ),

                      //
                      SizedBox(
                        width: 10,
                      ),

                      //

                      SizedBox(
                        width: 100,
                        child: ElevatedButton(
                            onPressed: () {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => CategoryScreen()));
                            },
                            style: ButtonStyle(
                                backgroundColor: MaterialStateProperty.all(
                              Color.fromARGB(255, 201, 14, 0),
                            )),
                            child: Text(
                              "Update",
                              style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.w500,
                                  color: Colors.white),
                            )),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            SizedBox(
              height: 130,
            ),

            //Add customer
            Padding(
              padding: EdgeInsets.only(left: 300),
              child: SizedBox(
                width: 100,
                height: 70,
                child: CircleAvatar(
                  child: Icon(Icons.add),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
