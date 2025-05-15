
import { PageWrapper } from '@/components/layout/PageWrapper';
import type { Metadata } from 'next';
import { APP_NAME, APP_DOMAIN } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Terms of Use | ${APP_NAME}`,
  description: `Read the Terms of Use for ${APP_NAME} (${APP_DOMAIN}). Understand your responsibilities and our disclaimers.`,
};

export default function TermsOfUsePage() {
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Use</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <p>Welcome to {APP_NAME} (referred to as "{APP_DOMAIN}", "we", "us", or "our"). These Terms of Use ("Terms") govern your access to and use of our website {APP_DOMAIN}, including any content, functionality, and services offered on or through {APP_DOMAIN} (the "Site").</p>
        <p>Please read these Terms carefully before you start to use the Site. By using the Site, you accept and agree to be bound and abide by these Terms and our Privacy Policy, found at <a href="/privacy" className="text-primary hover:underline">/privacy</a>, incorporated herein by reference. If you do not want to agree to these Terms or the Privacy Policy, you must not access or use the Site.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Use of the Site</h2>
        <p>The tools and information provided on {APP_NAME} are for general informational and utility purposes only. We grant you a limited, non-exclusive, non-transferable, revocable license to use the Site for your personal, non-commercial use, or legitimate business purposes related to your role as a developer, content creator, or digital professional.</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">User Responsibility</h2>
        <p>You are responsible for your use of the tools and services provided on the Site. Any data you input into the tools is processed at your own risk. For tools that operate client-side, your data remains within your browser. For tools that may require server interaction (which will be clearly indicated), we take measures to protect data, but you acknowledge that transmission of information over the internet is not entirely secure.</p>
        <p>You agree to use the Site and its tools in a lawful manner and not for any purpose that is prohibited by these Terms or by applicable law.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">No Guarantees or Warranties</h2>
        <p>THE SITE AND ITS CONTENT, TOOLS, AND SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE MAKE NO WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SITE.</p>
        <p>WITHOUT LIMITING THE FOREGOING, NEITHER {APP_NAME} NOR ANYONE ASSOCIATED WITH {APP_NAME} REPRESENTS OR WARRANTS THAT THE SITE, ITS CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SITE WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT OUR SITE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT THE SITE OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SITE WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.</p>
        <p>WE HEREBY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Limitation of Liability</h2>
        <p>IN NO EVENT WILL {APP_NAME}, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE SITE OR SUCH OTHER WEBSITES, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SITE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Prohibited Usage</h2>
        <p>You may use the Site only for lawful purposes and in accordance with these Terms. You agree not to use the Site:</p>
        <ul className="list-disc list-inside">
          <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
          <li>To engage in any activity that interferes with or disrupts the Site or the servers and networks connected to the Site.</li>
          <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Site, the server on which the Site is stored, or any server, computer, or database connected to the Site.</li>
          <li>To use any robot, spider, or other automatic device, process, or means to access the Site for any purpose, including monitoring or copying any of the material on the Site, without our prior written consent.</li>
          <li>To introduce any viruses, trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Intellectual Property Rights</h2>
        <p>The Site and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by {APP_NAME}, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Third-Party Links and Advertising</h2>
        <p>The Site may contain links to third-party websites or services that are not owned or controlled by {APP_NAME}. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that {APP_NAME} shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.</p>
        <p>The Site may display advertisements from third parties, such as Google AdSense. Your interactions with these advertisements are governed by the terms and policies of the third-party advertisers.</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Changes to the Terms of Use</h2>
        <p>We may revise and update these Terms of Use from time to time in our sole discretion. All changes are effective immediately when we post them. Your continued use of the Site following the posting of revised Terms of Use means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Contact Information</h2>
        <p>If you have any questions about these Terms of Use, please <a href="/contact" className="text-primary hover:underline">contact us</a>.</p>
        
        {/* <!-- AdSense Placeholder: Terms of Use Content Area --> */}
      </div>
    </PageWrapper>
  );
}
