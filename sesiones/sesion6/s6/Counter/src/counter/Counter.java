/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package counter;

import java.util.Arrays;
import java.util.logging.Level;
import java.util.logging.Logger;

class Counter implements Runnable{
    private int c = 0;
    private String[] numsA = new String[100];
    private String[] numsB = new String[100];

    public void increment() {
        c++;
    }

    public void decrement() {
        c--;
    }

    public int value() {
        return c;
    }
    
    public String[] getNumsA(){
      return numsA;
    }
    
    public String[] getNumsB(){
      return numsB;
    }
    
    public void run(){
      for(int i = 0; i < 100; i++){
        if("A".equals(Thread.currentThread().getName())){
          increment();
          this.numsA[i] = "A: " + this.c;
        } else {
          decrement();
          this.numsB[i] = "B: " + this.c;
        }
      }
    }
    
    public static void main(String [] args) {
      Counter c1 = new Counter();
      Thread t1 = new Thread(c1, "A");
      Thread t2 = new Thread(c1, "B");
      
//      int count = 0;
//      while(count < 100){
        t1.start();
        t2.start();
        
        try {
          t1.join();
          t2.join();
        } catch (InterruptedException ex) {
          Logger.getLogger(Counter.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        System.out.println(Arrays.toString(c1.getNumsA()));
        System.out.println(Arrays.toString(c1.getNumsB()));
//        System.out.println(c2.value());
//        count++;
//      }

    }

}