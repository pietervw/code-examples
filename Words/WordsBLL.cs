    public class WordsBll
    {
        /// <summary>
        /// Reverses the letters of words in a sentence
        /// </summary>
        /// <param name="sentence"></param>
        /// <returns></returns>
        public static string ReverseWordsInSentence(string sentence)
        {
            // Split sentence into individual words
            string[] wordsArray = sentence.Split(' ');

            // Loop through words
            for (int i = 0; i < wordsArray.Length; i++)
            {
                string reversedWord = "";

                // Loop through letters in reverse
                for (int j = wordsArray[i].Length - 1; j >= 0; j--)
                {
                    reversedWord = reversedWord + wordsArray[i][j];
                }

                // Replace the words array value with its new reversed equivalent
                wordsArray[i] = reversedWord;
            }

            // Join words in the array back into a sentence with spaces inbetween
            return string.Join(" ", wordsArray);
        }