#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/highgui/highgui.hpp"
#include <stdlib.h>
#include <stdio.h>
#include <iostream>
#include <typeinfo>

using namespace cv;
using namespace std;

/** @function main */
int main( int argc, char** argv )
{
  // cout << argc << endl;
  // return argc;
  Mat src, src_gray;
  Mat grad;
  // char* window_name = "Sobel Demo - Simple Edge Detector";
  int scale = 1;
  int delta = 0;
  int ddepth = CV_16S;
  RNG rng(12345);

  // cout << argv[1] << endl;
  /// Load an image
  src = imread(argv[1]);

  // cout << !src.data << endl;
  if( !src.data )
  { return -1; }

  GaussianBlur(src, src, Size(3,3), 0, 0, BORDER_DEFAULT );

  /// Convert it to gray
  cvtColor( src, src_gray, CV_BGR2GRAY );

  // threshold(src_gray, src_gray, 45, 255, THRESH_TOZERO);
  // erode(src_gray, src_gray, 2);
  // dilate(src_gray, src_gray, 2);

  /// Create window
  // namedWindow( window_name, CV_WINDOW_AUTOSIZE );

  /// Generate grad_x and grad_y
  Mat grad_x, grad_y;
  Mat abs_grad_x, abs_grad_y;

  /// Gradient X
  //Scharr( src_gray, grad_x, ddepth, 1, 0, scale, delta, BORDER_DEFAULT );
  Sobel( src_gray, grad_x, ddepth, 1, 0, 3, scale, delta, BORDER_DEFAULT );
  convertScaleAbs( grad_x, abs_grad_x );

  /// Gradient Y
  //Scharr( src_gray, grad_y, ddepth, 0, 1, scale, delta, BORDER_DEFAULT );
  Sobel( src_gray, grad_y, ddepth, 0, 1, 3, scale, delta, BORDER_DEFAULT );
  convertScaleAbs( grad_y, abs_grad_y );

  /// Total Gradient (approximate)
  addWeighted( abs_grad_x, 0.5, abs_grad_y, 0.5, 0, grad );
  threshold(grad, grad, 75, 255, THRESH_TOZERO);

  // imshow( window_name, grad );

  // uchar* p;
  // p = grad.ptr<uchar>(3);
  // const float* p = grad.ptr<float>();
  // cout << "Point (2D)faddas = " << p[3] << endl;

  vector<vector<Point> > contours;
  vector<Vec4i> hierarchy;
  findContours( grad, contours, hierarchy, CV_RETR_EXTERNAL, CV_CHAIN_APPROX_SIMPLE, Point(0, 0));
  
  Mat drawing = Mat::zeros( grad.size(), CV_8UC3 );
  int maximum;
  int bottomIdx;
  int bottomCoord;
  int topIdx;
  int topCoord;
  float currArea;
  float maxArea;
  
  for( int i = 0; i < contours.size(); i++ ) {
    currArea = contourArea(contours[i]);
    if (currArea > maxArea) {
      maxArea = currArea;
      maximum = i;
    }
  }
  
  Scalar color = Scalar( rng.uniform(0, 255), rng.uniform(0,255), rng.uniform(0,255) );
  drawContours( drawing, contours, maximum, color, 2, 8, hierarchy, 0, Point() );

  for (int i=0; i < contours[maximum].size(); i++) {
    if (contours[maximum][i].y > bottomCoord) {
      bottomCoord = contours[maximum][i].y;
      bottomIdx = i;
    }

    if (contours[maximum][i].y < topCoord) {
      topCoord = contours[maximum][i].y;
      topIdx = i;
    }

  }
  
  // circle(drawing, contours[maximum][bottomIdx], 3, (0, 0, 255), -1);
  // circle(drawing, contours[maximum][topIdx], 3, (0, 0, 255), -1);
  /// Show in a window
  // namedWindow( "Contours", CV_WINDOW_AUTOSIZE );
  // imshow( "Contours", drawing );
  
  imwrite( "./outline1.jpg", drawing);
  // waitKey(0);
  cout << maxArea;
  return maxArea;
  }