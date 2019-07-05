public class FibonacciBll
    {
        /// <summary>
        /// Returns the nth number in the fibonacci sequence.
        /// </summary>
        /// <param name="n">nth number in the fibonacci sequence to return</param>
        /// <returns>long</returns>
        public static long DetermineFibonacciNumber(int n)
        {
            // protect against overflow
            if (n < -92 || (n > 92))
                throw new Exception("64-bit integer overflow");

            // convert negative n to positive
            int postiveN = (n < 0) ? n * -1 : n;

            long a = 0,
            b = postiveN > 0 ? 1 : 0,
            c = a + b;

            // loop to determine what number at n-th position would be
            for (var i = 1; i < postiveN; i++)
            {
                a = b;
                b = c;
                c = a + b;
            }

            // if input was negative, make result negative too
            return n < 0 ? b * -1 : b;
        }
    }
