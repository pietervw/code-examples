public class TrianglesBll
    {
        // Lookup types of triangles
        public enum TriangleTypes
        {
            Error,
            Equilateral,
            Isosceles,
            Scalene,
            Acute,
            Obtuse,
            Right
        }

        /// <summary>
        /// Determines the type and validity of a triangle, given the lengths of its three sides
        /// </summary>
        /// <param name="a">Length of side A (positive, whole number)</param>
        /// <param name="b">Length of side B (positive, whole number)</param>
        /// <param name="c">Length of side C (positive, whole number)</param>
        /// <returns>TriangleTypes enum</returns>
        public static TriangleTypes DetermineTriangleType(int a, int b, int c)
        {
            //Check if valid triangle
            if (!((a + b > c) && (a + c > b) && (b + c > a)))
                return TriangleTypes.Error;

            int[] sides = { a, b, c };

            // Determine which sides are the longest and shortest
            int longestSide = sides.Max(),
            shortestSide = sides.Min(),
            otherSide = sides.Count(m => m == shortestSide) == 1
                ? sides.First(m => (m != longestSide && m != shortestSide) || m == longestSide)
                : shortestSide;

            //Equilateral
            if (sides.Count(m => m == a) == 3)
                return TriangleTypes.Equilateral;

            //Isosceles
            else if (sides.Count(m => m == a) == 2 || sides.Count(m => m == b) == 2)
                return TriangleTypes.Isosceles;

            //Scalene
            else if (sides.Count(m => m == a) == 1 && sides.Count(m => m == b) == 1 && sides.Count(m => m == c) == 1)
                return TriangleTypes.Scalene;

            //Acute
            else if (longestSide < ((shortestSide * shortestSide) + (otherSide * otherSide)))
                return TriangleTypes.Acute;

            //Obtuse
            else if (longestSide > ((shortestSide * shortestSide) + (otherSide * otherSide)))
                return TriangleTypes.Obtuse;

            //Right
            else if (longestSide == ((shortestSide * shortestSide) + (otherSide * otherSide)))
                return TriangleTypes.Right;

            return TriangleTypes.Error;
        }
    }